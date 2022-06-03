import { responseDataCreator } from "../../helpers/common.js";
import { badRequestErrorCreator } from "../../helpers/errors.js";
import { getAllUsers } from "./db.js"

export const handleGetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(responseDataCreator({users}));
    } catch (err) {
        return res.json(badRequestErrorCreator());
    }
}