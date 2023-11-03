import { z } from 'zod'

export const UserApiSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
})
export type UserApiType = z.infer<typeof UserApiSchema>
export type UserType = Omit<UserApiType, '_id'> & {
  id: string
}
