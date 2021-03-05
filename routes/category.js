import { Router } from "express";
import category from '../controllers/category.js'

const router = Router()

router.get("/", category.categoryGet)

router.get("/:id", category.categoryById)

router.post("/", category.categoryPost)

router.put("/", category.categoryModify)

router.put("/enable/:id", category.stateEnable)

router.put("/disable/:id", category.stateDisable)

router.delete("/:id", category.categoryDelete)

export default router