import { Router } from "express";
import { check } from "express-validator"

import validateInputs from "../middlewares/validate-inputs.js"
import validateJWT from "../middlewares/validate-JWT.js"
import categoryHelpers from "../db-helpers/category.js"
import category from '../controllers/category.js'

const router = Router()

router.get(
  "/",
  [
    validateJWT.validate,
    validateInputs
  ], 
  category.categoryGet
)

router.get(
  "/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryHelpers.byId),
    validateInputs
  ],
  category.categoryById
)

router.post(
  "/",
  [
    validateJWT.validate,
    check('name', 'El nombre es obligatorio!').not().isEmpty(),
    check('name').custom(categoryHelpers.byName),
    validateInputs
  ],
  category.categoryPost
)

router.put(
  "/:id", 
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryHelpers.existCategoryById),
    check('name').custom(categoryHelpers.existCategoryByName),
    validateInputs
  ],
  category.categoryModify
)

router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryHelpers.existCategoryById),
    validateInputs
  ], 
  category.stateEnable
)

router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryHelpers.existCategoryById),
    validateInputs
  ], 
  category.stateDisable
)

router.delete(
  "/:id",
  [
    validateJWT.validate,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoryHelpers.existCategoryById),
    validateInputs
  ], 
  category.categoryDelete
)

export default router