import { Router } from "express";
import sale from "../controllers/sale.js";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-JWT.js";
import validateInputs from "../middlewares/validate-inputs.js";
import saleHelpers from "../db-helpers/sale.js";

const router = Router();

router.get("/", [validateJWT.validate], sale.get);

router.get(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs,
  ],
  sale.getById
);
router.post(
  "/",
  [
    validateJWT.validate,
    check("user", "Tipo persona requerida").not().isEmpty(),
    check("person", "Nombre requerido").not().isEmpty(),
    check("typeProof", "Documento requerido").not().isEmpty(),
    check("serieProof", "ID Documento requerido").not().isEmpty(),
    check("numProof", "Dirección requerida").not().isEmpty(),
    check("total", "Dirección requerida").not().isEmpty(),
    check("tax", "Celular requerido").not().isEmpty(),
    check("details", "E-mail requerido").not().isEmpty(),
/*     check("idDocument").custom(saleHelpers.byIdDocument),
    check("phone").custom(saleHelpers.byPhone),
    check("email").custom(saleHelpers.byEmail), */
    validateInputs,
  ],
  sale.add
);
router.put(
  "/:id",
  [
    validateJWT.validate,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    check("idDocument").custom(saleHelpers.byIdDocument),
    check("phone").custom(saleHelpers.byPhone),
    check("email").custom(saleHelpers.byEmail),
    validateInputs
  ],
  sale.modify
);
router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs,
  ],
  sale.enable
);
router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check("id", "ID inválido").isMongoId(),
    check("id").custom(saleHelpers.byId),
    validateInputs,
  ],
  sale.disable
);

export default router;