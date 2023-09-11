import { Document } from "mongoose"

export interface IInfo extends Document {
    label: string
    description: string
    todoId: string
}