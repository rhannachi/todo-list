import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUserApi, fetchUsersApi } from './user.service'
import { RejectType, ToObjectType } from '../../helper'
import { UserType } from './user.type'

export const fetchUsersThunk = createAsyncThunk<UserType[], undefined, RejectType>(
  'users/fetch',
  async (_, thunkApi) => {
    const response = await fetchUsersApi()

    if ('error' in response) {
      return thunkApi.rejectWithValue({ error: response.error })
    }

    return response
  },
)
/**
 * AddTodo API
 */
export const createUserThunk = createAsyncThunk<
  UserType,
  ToObjectType<Parameters<typeof createUserApi>>,
  RejectType
>('user/add', async (user, thunkApi) => {
  const response = await createUserApi({
    name: user.name,
    email: user.email,
  })

  if ('error' in response) {
    return thunkApi.rejectWithValue({ error: response.error })
  }
  return response
})
