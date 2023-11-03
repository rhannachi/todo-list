import { Response, Request } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"

class ErrorApi {
    message: string
    status: number

    constructor(status: number, message: string) {
        this.message = message
        this.status = status
    }
}

const handlerErrorApi = (error: unknown | ErrorApi): [number, string] => {
    let status = 500
    let message = 'internal server error'

    if (error instanceof ErrorApi) {
        status = error.status
        message = error.message
    }

    return [status, message]
}

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos: ITodo[] = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({
            error: {
                status,
                message
            }
        });
    }
}

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<ITodo, "name" | "userId">

        if (!body.name) {
            throw new ErrorApi(400, 'The name field does not exist')
        }
        if (!body.userId) {
            throw new ErrorApi(400, 'The userId field does not exist')
        }

        const todo: ITodo = new Todo({
            name: body.name,
            userId: body.userId,
        })

        const newTodo = await todo.save().catch(() => {
            throw new ErrorApi(404, 'Todo save failed')
        })

        res
            .status(200)
            .json({ todo: newTodo })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({
            error: {
                status,
                message
            }
        });
    }
  }

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
            req.params.id
        ).catch(() => {
            throw new ErrorApi(404, 'Todo remove failed')
        })

        res.status(200).json({
            _id: deletedTodo?._id,
        })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({
            error: {
                status,
                message
            }
        });
    }
}