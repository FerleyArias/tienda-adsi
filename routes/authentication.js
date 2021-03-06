import {Router} from "express"
import authentication from "../controllers/authentication.js"

const router = Router()

router.post('/login', authentication.login)

export default router