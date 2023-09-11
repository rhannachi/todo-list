import { Router } from "express"
import {addUser, getUser, getUsers} from "../controllers/users";

const router: Router = Router()

router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.post("/add-user", addUser)

export default router