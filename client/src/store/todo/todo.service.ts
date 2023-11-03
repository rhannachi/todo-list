import { ErrorType, handleErrorApi } from '../../helper'
import { Zodios } from '@zodios/core'
import { z } from 'zod'
import { infoApiSchema, InfoType, todoApiSchema, TodoType } from './todo.type'
import { infoApiTransform, todoApiTransform, todosApiTransform } from './todo.mapper'

const todoBaseUrl = 'http://localhost:4001' as const
const infoBaseUrl = 'http://localhost:4003' as const

const createTodoApiPayloadSchema = z.object({
  name: z.string(),
  userId: z.string(),
})
const createInfoApiPayloadSchema = z.object({
  label: z.string(),
  description: z.string(),
  todoId: z.string(),
})
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
  {
    method: 'post',
    path: '/add-todo',
    alias: 'createTodo',
    description: 'Create a todo',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        description: 'The object to create todo',
        schema: createTodoApiPayloadSchema,
      },
    ],
    response: z
      .object({
        todo: todoApiSchema,
      })
      .transform(todoApiTransform),
  },
  {
    method: 'delete',
    path: '/delete-todo/:id',
    alias: 'deleteTodo',
    description: 'Delete todo',
    parameters: [],
    response: z
      .object({
        _id: z.string(),
      })
      .transform(({ _id }) => ({
        id: _id,
      })),
  },
])

export const infoService = new Zodios(infoBaseUrl, [
  {
    method: 'get',
    path: '/info-by-todo-id/:id',
    alias: 'fetchInfo',
    description: 'Get info by todoId',
    parameters: [],
    response: z
      .object({
        info: infoApiSchema,
      })
      .transform(infoApiTransform),
  },
  {
    method: 'post',
    path: '/add-info',
    alias: 'createInfo',
    description: 'Create a info',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        description: 'The object to create info',
        schema: createInfoApiPayloadSchema,
      },
    ],
    response: z
      .object({
        info: infoApiSchema,
      })
      .transform(infoApiTransform),
  },
  {
    method: 'delete',
    path: '/delete-info/:id',
    alias: 'deleteInfo',
    description: 'Delete info',
    response: z
      .object({
        _id: z.string(),
      })
      .transform(({ _id }) => ({
        id: _id,
      })),
  },
])

/**
 * fetchTodosApi
 */
export const fetchTodosApi = async (): Promise<TodoType[] | ErrorType> => {
  try {
    return await todoService.fetchTodos()
  } catch (error) {
    return handleErrorApi(error)
  }
}

/**
 * addTodoApi
 */
export const addTodoApi = async (
  todo: z.infer<typeof createTodoApiPayloadSchema>,
): Promise<TodoType | ErrorType> => {
  try {
    return await todoService.createTodo(todo)
  } catch (error) {
    return handleErrorApi(error)
  }
}
/**
 * fetchInfoApi
 */
export const fetchInfoApi = async (todoId: string): Promise<InfoType | ErrorType> => {
  try {
    return await infoService.fetchInfo({ params: { id: todoId } })
  } catch (error) {
    return handleErrorApi(error)
  }
}

/**
 * addInfoApi
 */
export const addInfoApi = async (
  info: z.infer<typeof createInfoApiPayloadSchema>,
): Promise<InfoType | ErrorType> => {
  try {
    return await infoService.createInfo(info)
  } catch (error) {
    return handleErrorApi(error)
  }
}

/**
 * DeleteInfoApi
 */
export const deleteInfoApi = async (id: string): Promise<{ id: string } | ErrorType> => {
  try {
    return await infoService.deleteInfo(undefined, { params: { id } })
  } catch (error) {
    return handleErrorApi(error)
  }
}

/**
 * DeleteTodoApi
 */
export const deleteTodoApi = async (id: string): Promise<{ id: string } | ErrorType> => {
  try {
    return await todoService.deleteTodo(undefined, { params: { id } })
  } catch (error) {
    return handleErrorApi(error)
  }
}
