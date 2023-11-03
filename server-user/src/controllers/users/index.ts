import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"

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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find()
        res.status(200).json({ users })
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

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const user = await User.findById(id).catch(() => undefined)

        if (user) {
            res.status(200).json({ user })
        } else {
            res.status(200).json()
        }
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

export const addUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IUser, "name" | "email">

        if (!body.name) {
            throw new ErrorApi(400, 'The name field does not exist')
        }
        if (!body.email) {
            throw new ErrorApi(400, 'The email field does not exist')
        }

        let user = await User.findOne({ email: body.email })

        if (!user) {
            const todo: IUser = new User({
                name: body.name,
                email: body.email,
            })
            user = await todo.save().catch(() => {
                throw new ErrorApi(404, 'User save failed')
            })
        }

        res
            .status(200)
            .json({ user })
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

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedUser: IUser | null = await User.findByIdAndRemove(
            req.params.id
        ).catch(() => {
            throw new ErrorApi(404, 'User remove failed')
        })

        res.status(200).json({
            _id: deletedUser?._id,
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