import {Router} from "express"
import { check } from "express-validator"

import authentication from "../controllers/authentication.js"
import validateInputs from "../middlewares/validate-inputs.js"

const router = Router()

router.post(
  '/login', 
  [
    check("email", "el email es obligatorio").isEmail,
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validateInputs
  ],
  authentication.login
)

export default router