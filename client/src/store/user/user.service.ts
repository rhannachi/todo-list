import { Zodios } from '@zodios/core'
import { handleError } from '../../helper'
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
    alias: 'fetchUsers',
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
export const fetchUsersApi = async (): Promise<UserType[]> => {
  try {
    return await userService.fetchUsers()
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * createUserApi
 */
export const createUserApi = async (
  user: z.infer<typeof createUserApiPayloadSchema>,
): Promise<UserType> => {
  try {
    return await userService.createUser(user)
  } catch (error) {
    throw handleError(error)
  }
}
