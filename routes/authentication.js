import {Router} from "express"
import { check } from "express-validator"

import authentication from "../controllers/authentication.js"
import validateInputs from "../middlewares/validate-inputs.js"

const router = Router()

router.post(
  '/login', 
  authentication.login
)

export default router