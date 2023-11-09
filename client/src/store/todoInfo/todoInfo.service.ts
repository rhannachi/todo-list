import { Zodios } from '@zodios/core'
import { z } from 'zod'
import { handleError } from '../../helper'
import { infoApiSchema, InfoType, todoApiSchema, TodoType } from './todoInfo.type'
import { infoApiTransform, todoApiTransform, todosApiTransform } from './todoInfo.transform'

const createTodoApiPayloadSchema = z.object({
  name: z.string(),
  userId: z.string(),
})
const createInfoApiPayloadSchema = z.object({
  label: z.string(),
  description: z.string(),
  todoId: z.string(),
})
const todoService = new Zodios('http://localhost:4001', [
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

const infoService = new Zodios('http://localhost:4003', [
  {
    method: 'get',
    path: '/info-by-todo-id/:id',
    alias: 'fetchInfo',
    description: 'Get info by todoId',
    parameters: [],
    response: z.union([
      z.null(),
      z
        .object({
          info: infoApiSchema,
        })
        .transform(infoApiTransform),
    ]),
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
export const fetchTodosApi = async (): Promise<TodoType[]> => {
  try {
    return await todoService.fetchTodos()
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * addTodoApi
 */
export const addTodoApi = async (
  todo: z.infer<typeof createTodoApiPayloadSchema>,
): Promise<TodoType> => {
  try {
    return await todoService.createTodo(todo)
  } catch (error) {
    throw handleError(error)
  }
}
/**
 * fetchInfoApi
 */
export const fetchInfoApi = async (todoId: string): Promise<InfoType | null> => {
  try {
    return await infoService.fetchInfo({ params: { id: todoId } })
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * addInfoApi
 */
export const addInfoApi = async (
  info: z.infer<typeof createInfoApiPayloadSchema>,
): Promise<InfoType> => {
  try {
    return await infoService.createInfo(info)
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * DeleteInfoApi
 */
export const deleteInfoApi = async (id: string): Promise<{ id: string }> => {
  try {
    return await infoService.deleteInfo(undefined, { params: { id } })
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * DeleteTodoApi
 */
export const deleteTodoApi = async (id: string): Promise<{ id: string }> => {
  try {
    return await todoService.deleteTodo(undefined, { params: { id } })
  } catch (error) {
    throw handleError(error)
  }
}
