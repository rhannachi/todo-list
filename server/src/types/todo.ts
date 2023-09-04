import { Document } from "mongoose"

// TODO interface that extends the Document type provided by mongoose. https://mongoosejs.com/docs/documents.html
export interface ITodo extends Document {
    name: string
    description: string
    status: boolean
}