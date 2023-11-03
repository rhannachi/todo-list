import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addInfoApi,
  addTodoApi,
  fetchInfoApi,
  fetchTodosApi,
  deleteTodoApi,
  deleteInfoApi,
} from './todo.service'
import { todoInfoMapper } from './todo.mapper'
import { createUserThunk } from '../user'
import { RejectType, ToObjectType } from '../../helper'
import { UserType } from '../user/user.type'
import { InfoType, TodoInfoType } from './todo.type'

/**
 * FetchTodos API
 */
export const fetchTodosThunk = createAsyncThunk<TodoInfoType[], undefined, RejectType>(
  'todos/fetch',
  async (_, thunkApi) => {
    try {
      const todosResponse = await fetchTodosApi()

      if ('error' in todosResponse) {
        return thunkApi.rejectWithValue(todosResponse)
      }

      const fetchInfosApiPromise = todosResponse.map(({ id }) => fetchInfoApi(id))
      const infosResponse = (await Promise.all(fetchInfosApiPromise)).reduce(
        (acc: InfoType[], item) => {
          if ('error' in item) {
            return acc
          }
          return [...acc, item]
        },
        [],
      )

      const todosInfo = todosResponse.reduce((acc: TodoInfoType[], todo) => {
        const info = infosResponse.find(({ todoId }) => todoId === todo.id)
        if (info) {
          return [...acc, todoInfoMapper(todo, info)]
        }

        return acc
      }, [])

      return todosInfo
    } catch (e) {
      return thunkApi.rejectWithValue({
        error: {
          message: 'Unable to retrieve the list of Todos',
          stack: `${e}`,
        },
      })
    }
  },
)

/**
 * AddTodo API
 */

export type AddTodoThunkPayloadType = {
  name: string
  label: string
  description: string
  email: string
  user: string
}

export const addTodoThunk = createAsyncThunk<TodoInfoType, AddTodoThunkPayloadType, RejectType>(
  'todos/add',
  async (data, thunkApi) => {
    const userResponse = await thunkApi.dispatch(
      createUserThunk({
        name: data.user,
        email: data.email,
      }),
    )

    if (userResponse.type !== 'user/add/fulfilled') {
      return thunkApi.rejectWithValue({
        error: {
          message: 'error add user',
        },
      })
    }

    const addTodoApiPayload: ToObjectType<Parameters<typeof addTodoApi>> = {
      name: data.name,
      userId: (userResponse.payload as UserType).id,
    }

    const todoResponse = await addTodoApi(addTodoApiPayload)

    if ('error' in todoResponse) {
      return thunkApi.rejectWithValue(todoResponse)
    }

    const addInfoApiPayload: ToObjectType<Parameters<typeof addInfoApi>> = {
      label: data.label,
      description: data.description,
      todoId: todoResponse.id,
    }

    const infoResponse = await addInfoApi(addInfoApiPayload)

    if ('error' in infoResponse) {
      return thunkApi.rejectWithValue(infoResponse)
    }

    return todoInfoMapper(todoResponse, infoResponse)
  },
)

/**
 * DeleteTodo API
 */

export type DeleteTodoThunkPayloadType = {
  idTodo: string
  idInfo: string
}

export const deleteTodoThunk = createAsyncThunk<
  { id: string },
  DeleteTodoThunkPayloadType,
  RejectType
>('todos/delete', async ({ idTodo, idInfo }, thunkApi) => {
  const todoResponse = await deleteTodoApi(idTodo)

  if ('error' in todoResponse) {
    return thunkApi.rejectWithValue(todoResponse)
  }

  const infoResponse = await deleteInfoApi(idInfo)

  if ('error' in infoResponse) {
    return thunkApi.rejectWithValue(infoResponse)
  }

  return { id: idTodo }
})
