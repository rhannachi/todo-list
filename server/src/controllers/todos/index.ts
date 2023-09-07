import { Response, Request } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        throw error
    }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "description" | "status">
      const todo: ITodo = new Todo({
        name: body.name,
        description: body.description,
        status: body.status,
      })
  
      const newTodo: ITodo = await todo.save()

      res
        .status(200)
        .json({ message: "Todo added", todo: newTodo })
    } catch (error) {
      throw error
    }
  }

const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      await Todo.updateOne({ _id: id }, body)
      const todoUpdated: ITodo | null = await Todo.findById(id)
      res.status(200).json({
        message: "Todo updated",
        todo: todoUpdated,
      })
    } catch (error) {
      throw error
    }
  }

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    )
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
    })
  } catch (error) {
    throw error
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }