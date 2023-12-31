import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addInfoApi,
  addTodoApi,
  fetchInfoApi,
  fetchTodosApi,
  deleteTodoApi,
  deleteInfoApi,
} from './todoInfo.service'
import { todoInfoMapper } from './todoInfo.transform'
import { createUserThunk } from '../user'
import { ErrorType, handleError, ToObjectType } from '../../helper'
import { InfoType, TodoInfoType } from './todoInfo.type'
import { addNotifyAction } from '../notify'

/**
 * FetchTodos API
 */
export const fetchTodoInfosThunk = createAsyncThunk<
  TodoInfoType[],
  undefined,
  {
    rejectValue: ErrorType
  }
>('todoInfo/fetch', async (_, thunkApi) => {
  try {
    const todosResponse = await fetchTodosApi()
    const fetchInfosApiPromise = todosResponse.map(({ id }) => fetchInfoApi(id))
    const infosResponse = (await Promise.all(fetchInfosApiPromise)).reduce(
      (acc: InfoType[], item) => {
        if (!item) {
          return acc
        }
        return [...acc, item]
      },
      [],
    )

    return todosResponse.reduce((acc: TodoInfoType[], todo) => {
      const info = infosResponse.find(({ todoId }) => todoId === todo.id)
      if (info) {
        return [...acc, todoInfoMapper(todo, info)]
      }
      return acc
    }, [])
  } catch (e) {
    const error = handleError(e)
    thunkApi.dispatch(
      addNotifyAction({
        type: 'error',
        description: 'Impossible de récupérer la liste des Todos',
        title: 'Error 🙁 !',
      }),
    )
    throw thunkApi.rejectWithValue(error)
  }
})

/**
 * AddTodoInfo API
 */

export type AddTodoInfoThunkPayloadType = {
  name: string
  label: string
  description: string
  email: string
  user: string
}
export const addTodoInfoThunk = createAsyncThunk<
  TodoInfoType,
  AddTodoInfoThunkPayloadType,
  {
    rejectValue: ErrorType
  }
>('todoInfo/add', async (data, thunkApi) => {
  try {
    const userResponse = await thunkApi.dispatch(
      createUserThunk({
        name: data.user,
        email: data.email,
      }),
    )

    if (!userResponse.payload) {
      throw new ErrorType({
        message: 'Impossible d`ajouter l`utilisateur',
        stack: 'Error add user',
      })
    }
    if (userResponse.payload instanceof ErrorType) {
      throw userResponse.payload
    }

    const addTodoApiPayload: ToObjectType<Parameters<typeof addTodoApi>> = {
      name: data.name,
      userId: userResponse.payload.id,
    }
    const todoResponse = await addTodoApi(addTodoApiPayload)
    const addInfoApiPayload: ToObjectType<Parameters<typeof addInfoApi>> = {
      label: data.label,
      description: data.description,
      todoId: todoResponse.id,
    }
    const infoResponse = await addInfoApi(addInfoApiPayload)

    const todoInfo = todoInfoMapper(todoResponse, infoResponse)

    thunkApi.dispatch(
      addNotifyAction({
        type: 'success',
        description: 'Le Todo a été ajouté avec succès',
        title: 'Yes !',
        delay: 3000,
      }),
    )
    return todoInfo
  } catch (e) {
    const error = handleError(e)
    thunkApi.dispatch(
      addNotifyAction({
        type: 'error',
        description: `${error.message}`,
        title: 'Error 🙁 !',
      }),
    )
    throw thunkApi.rejectWithValue(error)
  }
})

/**
 * DeleteTodo API
 */
export type DeleteTodoInfoThunkPayloadType = {
  idTodo: string
  idInfo: string
}
export const deleteTodoInfoThunk = createAsyncThunk<
  { id: string },
  DeleteTodoInfoThunkPayloadType,
  {
    rejectValue: ErrorType
  }
>('todoInfo/delete', async ({ idTodo, idInfo }, thunkApi) => {
  try {
    const todoResponse = await deleteTodoApi(idTodo)
    await deleteInfoApi(idInfo)

    thunkApi.dispatch(
      addNotifyAction({
        type: 'success',
        description: 'Le Todo a été supprimé avec succès',
        title: 'Yes !',
        delay: 3000,
      }),
    )
    return { id: todoResponse.id }
  } catch (e) {
    const error = handleError(e)
    thunkApi.dispatch(
      addNotifyAction({
        type: 'error',
        description: `${error.message}`,
        title: 'Error 🙁 !',
      }),
    )
    return thunkApi.rejectWithValue(error)
  }
})
