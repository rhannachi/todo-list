import axios, { AxiosResponse } from 'axios'
import { ErrorType, handleErrorApi, handleErrorApi2 } from '../../helper'
import { Zodios } from '@zodios/core'
import { z } from 'zod'
import { InfoApiType, todoApiSchema, TodoApiType, TodoType } from './todo.type'
import { todosApiTransform } from './todo.mapper'

const todoBaseUrl = 'http://localhost:4001' as const
const infoBaseUrl = 'http://localhost:4003' as const

const todoService = new Zodios(todoBaseUrl, [
  {
    method: 'get',
    path: '/todos',
    alias: 'fetchTodos',
    description: 'Get all todos',
    parameters: [],
    response: z
      .object({
        todos: z.array(todoApiSchema),
      })
      .transform(todosApiTransform),
  },
])

// export const infoService = new Zodios(todoBaseUrl, [
//   {
//     method: 'get',
//     path: '/users',
//     alias: 'fetchUsers',
//     description: 'Get all users',
//     parameters: [],
//     response: z
//       .object({
//         users: z.array(UserApiSchema),
//       })
//       .transform(usersApiTransform),
//   },
// ])

/**
 * fetchTodosApi
 */
export const fetchTodosApi = async (): Promise<TodoType[] | ErrorType> => {
  try {
    return await todoService.fetchTodos()
  } catch (error) {
    return handleErrorApi2(error)
  }

  // try {
  //   const response: AxiosResponse<FetchTodosApiResponseType> = await axios.get(
  //     todoBaseUrl + '/todos',
  //   )
  //   if (response.status !== 200 || !response.data) {
  //     throw Error('Failed to fetch todos')
  //   }
  //   return response.data
  // } catch (e) {
  //   return handleErrorApi(e, 'Error fetchTodosApi')
  // }
}

/**
 * addTodoApi
 */
type AddTodoApiPayloadType = Omit<TodoApiType, '_id'>
type AddTodoApiResponseType = {
  todo: TodoApiType
}
export const addTodoApi = async (
  todo: AddTodoApiPayloadType,
): Promise<AddTodoApiResponseType | Error> => {
  try {
    const response: AxiosResponse<AddTodoApiResponseType> = await axios.post(
      todoBaseUrl + '/add-todo',
      todo,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to add todo')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error addTodoApi')
  }
}
/**
 * fetchInfoApi
 */
type FetchInfoApiResponseType = {
  info: InfoApiType
}
export const fetchInfoApi = async (userId: string): Promise<FetchInfoApiResponseType | Error> => {
  try {
    const response: AxiosResponse<FetchInfoApiResponseType> = await axios.get(
      `${infoBaseUrl}/info-by-todo-id/${userId}`,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to fetch info')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error fetchInfoApi')
  }
}

/**
 * addInfoApi
 */
type AddInfoApiPayloadType = Omit<InfoApiType, '_id'>
type AddInfoApiResponseType = {
  info: InfoApiType
}
export const addInfoApi = async (
  info: AddInfoApiPayloadType,
): Promise<AddInfoApiResponseType | Error> => {
  try {
    const response: AxiosResponse<AddInfoApiResponseType> = await axios.post(
      infoBaseUrl + '/add-info',
      info,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to add info')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error addInfoApi')
  }
}

/**
 * DeleteInfoApi
 */
type DeleteInfoApiResponseType = {
  _id: string
}
export const deleteInfoApi = async (id: string): Promise<DeleteInfoApiResponseType | Error> => {
  try {
    const response: AxiosResponse<DeleteInfoApiResponseType> = await axios.delete(
      infoBaseUrl + '/delete-info/' + id,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to delete info')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error deleteInfoApi')
  }
}

/**
 * DeleteTodoApi
 */
type DeleteTodoApiResponseType = {
  _id: string
}
export const deleteTodoApi = async (id: string): Promise<DeleteTodoApiResponseType | Error> => {
  try {
    const response: AxiosResponse<DeleteTodoApiResponseType> = await axios.delete(
      todoBaseUrl + '/delete-todo/' + id,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to delete info')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error deleteTodoApi')
  }
}
