import { IInfo } from '../types/info';
import { model, Schema } from 'mongoose'

const infoSchema: Schema = new Schema({
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    todoId: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default model<IInfo>('Info', infoSchema)