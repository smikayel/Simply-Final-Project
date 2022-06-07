import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from "../../helpers/errors.js";
import { getTest } from "./db.js";
import { getUserTests } from "../Users/db.js";
import bcrypt from 'bcrypt'

export const handleGetTest = async (req, res) => {
  try {
    const {id: testId} = req.params;
    if (req.role !== "Admin") {
      const {id: userId} = req.body;

      const tests = await getUserTests(userId)
      const match = tests.some(test => +test.test.id === +testId);

      if (!match) {
        res.json(unauthorizedErrorCreator("You cant access this test"));
        return;
      }
    }

    const test = await getTest(+testId);

    res.json(responseDataCreator(test));

  } catch (err) {
    console.log('as');
    return res.json(badRequestErrorCreator(err.message))
  }
}
