import {Router} from 'express'
import { check } from 'express-validator'

import validatorInputs from '../middlewares/validate-inputs.js'
import user from '../controllers/user.js'

const router = Router()

router.get(
  "/",
  [
    validatorInputs
  ], 
  user.userGet
)

router.get(
  "/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validatorInputs
  ],
  user.userGetById
)

router.post(
  "/",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validatorInputs
  ],
  user.userPost
)

router.put(
  "/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validatorInputs
  ],
  user.userModify
)

router.put(
  "/enable/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validatorInputs
  ], 
  user.stateEnable
)

router.put(
  "/disable/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validatorInputs
  ],
  user.stateDisable
)


export default router