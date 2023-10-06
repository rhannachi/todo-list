import { Router } from "express"
import {getInfos, addInfo, getInfo, deleteInfo} from "../controllers/infos"

const router: Router = Router()

router.get("/infos", getInfos)
router.get("/info-by-todo-id/:todoId", getInfo)
router.post("/add-info", addInfo)
router.delete("/delete-info/:id", deleteInfo)

export default router