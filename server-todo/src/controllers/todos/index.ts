import { Response, Request } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "userId">
      const todo: ITodo = new Todo({
        name: body.name,
        userId: body.userId,
      })
  
      const newTodo: ITodo = await todo.save()

      res
        .status(200)
        .json({ todo: newTodo })
    } catch (error) {
      throw error
    }
  }

