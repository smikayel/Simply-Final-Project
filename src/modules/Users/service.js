import { responseDataCreator } from "../../helpers/common.js";
import { badRequestErrorCreator } from "../../helpers/errors.js";
import { getAllUsers, createUser, deleteUserById } from "./db.js"
import bcrypt from 'bcrypt'

export const handleGetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(responseDataCreator({users}));
    } catch (err) {
        return res.json(badRequestErrorCreator());
    }
}

export const handleCreateUser = async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 5, async function (err, hash) {
            req.body.password = hash
            req.body.roleId  = parseInt(req.body.roleId);
            const createdUser = await createUser(req.body);
            res.json(responseDataCreator({ createdUser }));
        });
    } catch (err) {
        return res.json(badRequestErrorCreator());
    }
}

export const handleDeleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserById(parseInt(req.body.id));
        res.json(responseDataCreator({ deletedUser }));
    } catch (err) {
        return res.json(badRequestErrorCreator());
    }
}