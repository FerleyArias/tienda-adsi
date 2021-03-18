import { Router } from "express";
import { check } from "express-validator"

import validateInputs from "../middlewares/validate-inputs.js"
import category from '../controllers/category.js'

const router = Router()

router.get(
  "/",
  [
    validateInputs
  ], 
  category.categoryGet
)

router.get(
  "/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ],
  category.categoryById
)

router.post(
  "/",
  [
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    validateInputs
  ],
  category.categoryPost
)

router.put(
  "/:id", 
  [
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ],
  category.categoryModify
)

router.put(
  "/enable/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ], 
  category.stateEnable
)

router.put(
  "/disable/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ], 
  category.stateDisable
)

router.delete(
  "/:id",
  [
    check('id', 'No es un ID válido').isMongoId(),
    validateInputs
  ], 
  category.categoryDelete
)

export default router