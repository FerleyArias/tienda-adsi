import { Router } from "express";
import sale from "../controllers/sale.js";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-JWT.js";
import validateInputs from "../middlewares/validate-inputs.js";
import saleHelpers from "../db-helpers/sale.js";
import userHelpers from "../db-helpers/user.js";
import personHelpers from "../db-helpers/person.js";

const router = Router();

router.get("/", [validateJWT.validate], sale.get);

router.get(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs
  ],
  sale.getById
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
    check("details", "Details es requerido").not().isEmpty(),
    check("user").custom(userHelpers.userById),
    check("person").custom(personHelpers.byId),
    validateInputs,
  ],
  sale.add
);
router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs,
  ],
  sale.enable
);
router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs,
  ],
  sale.disable
);

export default router;