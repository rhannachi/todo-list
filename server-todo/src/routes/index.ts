import { Router } from "express"
import { getTodos, addTodo, deleteTodo } from "../controllers/todos"

const router: Router = Router()

router.get("/todos", getTodos)
router.post("/add-todo", addTodo)
router.delete("/delete-todo/:id", deleteTodo)

export default router 