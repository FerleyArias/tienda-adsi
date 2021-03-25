import { Router } from "express";
import item from "../controllers/item.js";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-JWT.js";
import validateInputs from "../middlewares/validate-inputs.js";
import itemHelpers from "../db-helpers/item.js";

const router = Router();

router.get("/", [validateJWT.validate], item.get);
router.get(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(itemHelpers.byId),
    validateInputs,
  ],
  item.getById
);
router.post(
  "/",
  [
    validateJWT.validate,
    check("category", "Categoria es requerida").not().isEmpty(),
    check("code", "Codigo es requerido").not().isEmpty(),
    check("name", "Nombre es requerido").not().isEmpty(),
    check("description", "Descripción es requerida").not().isEmpty(),
    check("price", "Precio es requerido").not().isEmpty(),
    check("stock", "Stock es requerido").not().isEmpty(),
    check("name").custom(itemHelpers.byName),
    check("code").custom(itemHelpers.byCode),
    validateInputs,
  ],
  item.add
);
router.put(
  "/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(itemHelpers.byId),
    check("name").custom(itemHelpers.byName),
    check("code").custom(itemHelpers.byCode),
    validateInputs
  ],
  item.modify
);
router.put(
  "/enable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(itemHelpers.byId),
    validateInputs,
  ],
  item.enable
);
router.put(
  "/disable/:id",
  [
    validateJWT.validate,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(itemHelpers.byId),
    validateInputs,
  ],
  item.disable
);

export default router;