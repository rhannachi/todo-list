import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        throw error
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const user = await User.findById(id)

        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(200).json(undefined)
        }
    } catch (error) {
        throw error
    }
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "name" | "email">
      const todo: IUser = new User({
        name: body.name,
          email: body.email,
      })
  
      const newUser: IUser = await todo.save()

      res
        .status(200)
        .json({ user: newUser })
    } catch (error) {
      throw error
    }
  }
  