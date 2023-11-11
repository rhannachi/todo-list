import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserApi, fetchUsersApi } from './user.service'
import { ErrorType, handleError, ToObjectType } from '../../helper'
import { UserType } from './user.type'
import { addNotifyAction } from '../notify'

export const fetchUsersThunk = createAsyncThunk<
  UserType[],
  undefined,
  {
    rejectValue: ErrorType
  }
>('users/fetch', async (_, thunkApi) => {
  try {
    return await fetchUsersApi()
  } catch (e) {
    const error = handleError(e)
    thunkApi.dispatch(
      addNotifyAction({
        type: 'error',
        description: 'Impossible de récupérer la liste des utilisateurs',
        title: 'Error 🙁 !',
      }),
    )
    throw thunkApi.rejectWithValue(error)
  }
})
/**
 * AddTodoInfo API
 */
export const createUserThunk = createAsyncThunk<
  UserType,
  ToObjectType<Parameters<typeof createUserApi>>,
  {
    rejectValue: ErrorType
  }
>('user/add', async (user, thunkApi) => {
  try {
    return await createUserApi({
      name: user.name,
      email: user.email,
    })
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
