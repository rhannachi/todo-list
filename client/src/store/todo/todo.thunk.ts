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
import { addUserThunk } from '../user'
import { RejectType, ToObjectType } from '../../helper'

/**
 * FetchTodos API
 */

export const fetchTodosThunk = createAsyncThunk<TodoType[], undefined, RejectType>(
  'todos/fetch',
  async (_, thunkApi) => {
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
          // TODO check return error
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

    // TODO ...
    return todos
  },
)

/**
 * AddTodo API
 */

type AddTodoThunkPayloadType = {
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
      addUserThunk({
        name: data.user,
        email: data.email,
      }),
    )

    if (userResponse.type !== 'user/add/fulfilled') {
      return thunkApi.rejectWithValue({
        message: 'error add user', // TODO ...
      })
    }

    // ///////////

    const addTodoApiPayload: ToObjectType<Parameters<typeof addTodoApi>> = {
      name: data.name,
      userId: (userResponse.payload as UserType).id, // TODO improvement
    }

    const todoResponse = await addTodoApi(addTodoApiPayload)

    if (todoResponse instanceof Error) {
      return thunkApi.rejectWithValue({
        message: todoResponse.message,
      })
    }

    // ///////////

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

type DeleteTodoThunkPayloadType = {
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