import { Response, Request } from "express"
import { IInfo } from "../../types/info"
import Info from "../../models/info"

export const getInfos = async (req: Request, res: Response): Promise<void> => {
    try {
        const infos: IInfo[] = await Info.find()
        res.status(200).json({ infos })
    } catch (error) {
        throw error
    }
}

export const getInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todoId = req.params.todoId
        const info = await Info.findOne({ 'todoId': todoId })

        if (info) {
            res.status(200).json({ info })
        } else {
            res.status(200).json(undefined)
        }
    } catch (error) {
        throw error
    }
}

export const addInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IInfo, "label" | "description" | "todoId">
      const info: IInfo = new Info({
          label: body.label,
        description: body.description,
          todoId: body.todoId,
      })
  
      const newInfo: IInfo = await info.save()

      res
        .status(200)
        .json({ info: newInfo })
    } catch (error) {
      throw error
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
        throw error
    }
}