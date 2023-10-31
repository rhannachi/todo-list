import { Response, Request } from "express"
import { IInfo } from "../../types/info"
import Info from "../../models/info"

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

export const getInfos = async (req: Request, res: Response): Promise<void> => {
    try {
        const infos: IInfo[] = await Info.find()
        res.status(200).json({ infos })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({ message });
    }
}

export const getInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todoId = req.params.todoId
        const info = await Info.findOne({ 'todoId': todoId })

        if (info) {
            res.status(200).json({ info })
        } else {
            res.status(200).json()
        }
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({ message });
    }
}

export const addInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IInfo, "label" | "description" | "todoId">

        if (!body.label) {
            throw new ErrorApi(400, 'The label field does not exist')
        }
        if (!body.description) {
            throw new ErrorApi(400, 'The description field does not exist')
        }
        if (!body.todoId) {
            throw new ErrorApi(400, 'The todoId field does not exist')
        }

        const info: IInfo = new Info({
            label: body.label,
            description: body.description,
            todoId: body.todoId,
        })
  
      const newInfo: IInfo = await info.save().catch(() => {
          throw new ErrorApi(404, 'Info save failed')
      })

      res
        .status(200)
        .json({ info: newInfo })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({ message });
    }
  }

export const deleteInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTodo: IInfo | null = await Info.findByIdAndRemove(
            req.params.id
        )
        res.status(200).json({
            _id: deletedTodo?._id,
        })
    } catch (error) {
        const [status, message] = handlerErrorApi(error)
        res.status(status).json({ message });
    }
}