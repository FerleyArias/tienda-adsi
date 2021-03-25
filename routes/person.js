
import { Router } from "express";
import person from "../controllers/person.js";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-JWT.js";
import validateInputs from "../middlewares/validate-inputs.js";
import personHelpers from "../db-helpers/person.js";

const router = Router();

router.get("/", [validateJWT.validate], person.get);

router.get(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(personHelpers.byId),
    validateInputs,
  ],
  person.getById
);
router.post(
  "/",
  [
    check("typePerson", "Tipo persona es requerido").not().isEmpty(),
    check("name", "Nombre es requerido").not().isEmpty(),
    check("document", "Documento es requerido").not().isEmpty(),
    check("idDocument", "ID Documento es requerida").not().isEmpty(),
    check("address", "Dirección es requerido").not().isEmpty(),
    check("phone", "Celular es requerido").not().isEmpty(),
    check("email", "E-mail es requerido").not().isEmpty(),
    check("idDocument").custom(personHelpers.byIdDocument),
    check("phone").custom(personHelpers.byPhone),
    check("email").custom(personHelpers.byEmail),
    validateInputs,
  ],
  person.add
);
router.put(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(personHelpers.byId),
    check("idDocument").custom(personHelpers.byIdDocument),
    check("phone").custom(personHelpers.byPhone),
    check("email").custom(personHelpers.byEmail),
    validateInputs
  ],
  person.modify
);
router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(personHelpers.byId),
    validateInputs,
  ],
  person.enable
);
router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(personHelpers.byId),
    validateInputs,
  ],
  person.disable
);

export default router;