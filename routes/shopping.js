import { Router } from "express";
import shopping from "../controllers/shopping.js";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-JWT.js";
import validateInputs from "../middlewares/validate-inputs.js";
import shoppingHelpers from "../db-helpers/shopping.js";
import userHelpers from "../db-helpers/user.js";
import personHelpers from "../db-helpers/person.js";

const router = Router();

router.get("/", [validateJWT.validate], shopping.get);

router.get(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(shoppingHelpers.byId),
  ],
  shopping.getById
);

router.post(
  "/",
  [
    validateJWT.validate,
    check("user", "Tipo persona es requerido").not().isEmpty(),
    check("user", "Tipo persona es requerido").isMongoId(),
    check("person", "Nombre es requerido").not().isEmpty(),
    check("person", "Nombre es requerido").isMongoId(),
    check("typeProof", "Documento es requerido").not().isEmpty(),
    check("serieProof", "ID Documento es requerida").not().isEmpty(),
    check("numProof", "Dirección es requerido").not().isEmpty(),
    check("details", "Detalles es requerido").not().isEmpty(),
    check("user").custom(userHelpers.userById),
    check("person").custom(personHelpers.byId),
    validateInputs,
  ],
  shopping.add
);
router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(shoppingHelpers.byId),
    validateInputs,
  ],
  shopping.enable
);
router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(shoppingHelpers.byId),
    validateInputs,
  ],
  shopping.disable
);

export default router;