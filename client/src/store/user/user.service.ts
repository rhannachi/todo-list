import { Zodios } from '@zodios/core'
import { ErrorType, handleErrorApi2 } from '../../helper'
import { userApiTransform, usersApiTransform } from './user.transform'
import { UserApiSchema, UserType } from './user.type'
import { z } from 'zod'

const baseUrl = 'http://localhost:4002' as const

const createUserApiPayloadSchema = z.object({
  name: z.string(),
  email: z.string(),
})
export const userService = new Zodios(baseUrl, [
  {
    method: 'get',
    path: '/users',
    alias: 'getUsers',
    description: 'Get all users',
    parameters: [],
    response: z
      .object({
        users: z.array(UserApiSchema),
      })
      .transform(usersApiTransform),
  },
  {
    method: 'post',
    path: '/add-user',
    alias: 'createUser',
    description: 'Create a user',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        description: 'The object to create user',
        schema: createUserApiPayloadSchema,
      },
    ],
    response: z
      .object({
        user: UserApiSchema,
      })
      .transform(userApiTransform),
  },
])

/**
 * fetchUsersApi
 */
export const fetchUsersApi = async (): Promise<UserType[] | ErrorType> => {
  try {
    return await userService.getUsers()
  } catch (error) {
    return handleErrorApi2(error)
  }
}

/**
 * createUserApi
 */
type CreateUserApiPayloadType = z.infer<typeof createUserApiPayloadSchema>
export const createUserApi = async (
  user: CreateUserApiPayloadType,
): Promise<UserType | ErrorType> => {
  try {
    return await userService.createUser(user)
  } catch (error) {
    return handleErrorApi2(error)
  }
}
