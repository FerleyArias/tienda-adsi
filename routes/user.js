import {Router} from 'express'
import { check } from 'express-validator'

import validateInputs from '../middlewares/validate-inputs.js'
import validateJWT from '../middlewares/validate-JWT.js'
import user from '../controllers/user.js'
import userHelpers from '../db-helpers/user.js'

const router = Router()

router.get(
  "/",
  [
    validateJWT.validate,
    validateInputs
  ], 
  user.userGet
)

router.get(
  "/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check("id").custom(userHelpers.userById),
    validateInputs
  ],
  user.userGetById
)

router.post(
  "/",
  [
    validateJWT.validate,
    check("email", "No es un email valido").isEmail(),
    check('email').custom(userHelpers.userEmail),
    validateInputs
  ],
  user.userPost
)

router.put(
  "/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ],
  user.userModify
)

router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ], 
  user.stateEnable
)

router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ],
  user.stateDisable
)


export default router