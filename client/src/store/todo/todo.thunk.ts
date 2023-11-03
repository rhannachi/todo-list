import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addInfoApi,
  addTodoApi,
  fetchInfoApi,
  fetchTodosApi,
  deleteTodoApi,
  deleteInfoApi,
} from './todo.service'
import { TodoTypeMapper } from './todo.mapper'
import { createUserThunk } from '../user'
import { RejectType, ToObjectType } from '../../helper'
import { UserType } from '../user/user.type'

/**
 * FetchTodos API
 */
export const fetchTodosThunk = createAsyncThunk<TodoType[], undefined, RejectType>(
  'todos/fetch',
  async (_, thunkApi) => {
    try {
      const todosResponse = await fetchTodosApi()

      if (todosResponse instanceof Error) {
        return thunkApi.rejectWithValue({
          message: todosResponse.message,
        })
      }

      const fetchInfosApiPromise = todosResponse.todos.map(({ _id }) => fetchInfoApi(_id))
      const infosResponse = (await Promise.all(fetchInfosApiPromise)).reduce(
        (acc: InfoApiType[], item) => {
          if (item instanceof Error || !item) {
            return acc
          }
          return [...acc, item.info]
        },
        [],
      )

      const todos = todosResponse.todos.reduce((acc: TodoType[], todo) => {
        const info = infosResponse.find(({ todoId }) => todoId === todo._id)
        if (info) {
          return [...acc, TodoTypeMapper(todo, info)]
        }

        return acc
      }, [])

      return todos
    } catch (e) {
      // TODO Error-handling
      console.log('rejecteeeed')
      return thunkApi.rejectWithValue({
        message: `${e}`,
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

export const addTodoThunk = createAsyncThunk<TodoType, AddTodoThunkPayloadType, RejectType>(
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
        message: 'error add user',
      })
    }

    const addTodoApiPayload: ToObjectType<Parameters<typeof addTodoApi>> = {
      name: data.name,
      userId: (userResponse.payload as UserType).id,
    }

    const todoResponse = await addTodoApi(addTodoApiPayload)

    if (todoResponse instanceof Error) {
      return thunkApi.rejectWithValue({
        message: todoResponse.message,
      })
    }

    const addInfoApiPayload: ToObjectType<Parameters<typeof addInfoApi>> = {
      label: data.label,
      description: data.description,
      todoId: todoResponse.todo._id,
    }

    const infoResponse = await addInfoApi(addInfoApiPayload)

    if (infoResponse instanceof Error) {
      return thunkApi.rejectWithValue({
        message: infoResponse.message,
      })
    }

    return TodoTypeMapper(todoResponse.todo, infoResponse.info)
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

  if (todoResponse instanceof Error) {
    return thunkApi.rejectWithValue({
      message: todoResponse.message,
    })
  }

  const infoResponse = await deleteInfoApi(idInfo)

  if (infoResponse instanceof Error) {
    return thunkApi.rejectWithValue({
      message: infoResponse.message,
    })
  }

  return { id: idTodo }
})
