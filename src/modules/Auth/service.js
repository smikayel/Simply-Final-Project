import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js';
import { getUser, updateUserbyId } from '../Users/db.js';
import dotenv from 'dotenv'
import { responseDataCreator } from '../../helpers/common.js';
dotenv.config();


export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.json(unauthorizedErrorCreator("Email and password are required!"));

    const foundUser = await getUser({email});
    if (!foundUser) return res.json(unauthorizedErrorCreator()); //Unauthorized 
    // evaluate password

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "role" : foundUser.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '300s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );


        // Creates Secure Cookie with refresh token            /// secure: true, 
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        const {refreshToken : rT, password : pw, ...sendUserDataFront } = foundUser;

        // Send authorization roles and access token to user
        res.json(responseDataCreator({
            user: sendUserDataFront,
            accessToken
        }));
        // Saving refreshToken with current user
        await updateUserbyId(foundUser.id, { refreshToken });
    } else {
        res.json(unauthorizedErrorCreator());
    }
}

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt)
        return res.json(unauthorizedErrorCreator('Refresh token expired!'));
    const refreshToken = cookies.jwt;

    const foundUser = await getUser({ refreshToken });
    if (!foundUser) 
        return res.sendStatus(403); //Forbidden 
    
    const sendUserDataFront = { ...foundUser };
    delete sendUserDataFront.refreshToken;
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "role": foundUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' }
            );
            res.json(responseDataCreator({
                user: sendUserDataFront,
                accessToken
            }));
        }
    );
}

export const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //No content
  const refreshToken = cookies.jwt

  // Is refreshToken in db?
  const foundUser = await getUser({ refreshToken })
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    return res.sendStatus(204)
  }

  // Delete refreshToken in db
  foundUser.refreshToken = ''
  await updateUserbyId(foundUser.id, { refreshToken: '' })

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
  res.sendStatus(204)
}