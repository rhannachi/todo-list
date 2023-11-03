import { z } from 'zod'

export const todoApiSchema = z.object({
  _id: z.string(),
  name: z.string(),
  userId: z.string(),
})
export const infoApiSchema = z.object({
  _id: z.string(),
  label: z.string(),
  description: z.string(),
  todoId: z.string(),
})

export type TodoApiType = z.infer<typeof todoApiSchema>
export type InfoApiType = z.infer<typeof infoApiSchema>
export type TodoType = Omit<TodoApiType, '_id'> & {
  id: string
}
export type InfoType = Omit<InfoApiType, '_id'> & {
  id: string
}
export type TodoInfoType = TodoType &
  Omit<InfoType, 'id' | 'todoId'> & {
    idInfo: string
  }
