import {Router} from 'express'
import user from '../controllers/user.js'

const router = Router()

router.get("/", user.userGet)

router.get("/:id", user.userGetById)

router.post("/", user.userPost)

router.put("/", user.userModify)

router.put("/enable/:id", user.stateEnable)

router.put("/disable/:id", user.stateDisable)


export default router