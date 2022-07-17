import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { unauthorizedErrorCreator, internalServerErrorCreator } from '../../helpers/errors.js'
import dotenv from 'dotenv'
import { responseDataCreator } from '../../helpers/common.js'
import { ACCESS_TOKEN_EXPIRE_TIME, REFRESH_TOKEN_EXPIRE_TIME } from '../constants.js'
import { getUsersIpAddresses, updateUserIpAddresses, getUser, updateUserbyId } from '../Users/db.js'
import { send_email } from '../../notification_sender/notification_sender.js'
dotenv.config()

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json(unauthorizedErrorCreator('Email and password are required!'))

    const foundUser = await getUser({ email })
    if (!foundUser) return res.status(401).json(unauthorizedErrorCreator()) //Unauthorized
    // evaluate password

    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
      await updateUserbyId(foundUser.id, { isOnline: true })
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE_TIME }
      )
      const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
      })

      // Creates Secure Cookie with refresh token            /// secure: true,
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      })

      foundUser.isOnline = true
      const { refreshToken: rT, password: pw, ...sendUserDataFront } = foundUser // eslint-disable-line no-unused-vars

      // Send authorization roles and access token to user
      res.status(200).json(
        responseDataCreator({
          user: sendUserDataFront,
          accessToken,
        })
      )
      // Saving refreshToken with current user
      await updateUserbyId(foundUser.id, { refreshToken })

      const ip = req.ip

      const { ipAddresses } = await getUsersIpAddresses(email)
      const date = new Date()
      if (!ipAddresses.some(({ ipAddress }) => ipAddress === ip)) {
        await updateUserIpAddresses(foundUser.id, ip)
        send_email(email, 'New login', 'new_login', {
          ip,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          date,
        })
      }
    } else {
      res.status(401).json(unauthorizedErrorCreator())
    }
  } catch (err) {
    res.status(500).json(internalServerErrorCreator())
  }
}

export const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies

    if (!cookies?.jwt)
      return res.status(401).json(unauthorizedErrorCreator('Refresh token expired!'))

    const refreshToken = cookies.jwt

    const foundUser = await getUser({ refreshToken })
    if (!foundUser) return res.sendStatus(403) //Forbidden

    await updateUserbyId(foundUser.id, { isOnline: true })
    const sendUserDataFront = { ...foundUser }
    delete sendUserDataFront.refreshToken
    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403)
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
            email: decoded.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRE_TIME }
      )

      res.status(200).json(
        responseDataCreator({
          user: sendUserDataFront,
          accessToken,
        })
      )
    })
  } catch (err) {
    res.status(500).json(internalServerErrorCreator())
  }
}

export const handleLogout = async (req, res) => {
  try {
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
    await updateUserbyId(foundUser.id, { isOnline: false })
    // Delete refreshToken in db

    await updateUserbyId(foundUser.id, { refreshToken: null })
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    res.status(500).json(internalServerErrorCreator())
  }
}
