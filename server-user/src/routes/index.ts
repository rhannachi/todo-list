import { Router } from "express"
import {addUser, deleteUser, getUser, getUsers} from "../controllers/users";

const router: Router = Router()

router.get("/users", getUsers)
router.get("/user/:id", getUser)
router.post("/add-user", addUser)
router.delete("/delete-user/:id", deleteUser)

export default router