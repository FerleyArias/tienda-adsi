import {Router} from 'express'
import category from '../controllers/category.js'

const router = Router()

router.get("/", category.categoryGet)

router.get("/:id", category.categoryById)

router.post("/", category.categoryPost)

router.put("/")

router.put("/enable/:id")

router.put("/disable/:id")

router.delete("/:id")

export default router