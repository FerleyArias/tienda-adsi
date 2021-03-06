import {Router} from "express"
import authentication from "../controllers/authentication.js"

const router = Router()

router.put('/login', authentication.login)

export default router