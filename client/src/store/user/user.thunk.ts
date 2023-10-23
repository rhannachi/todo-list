import { createAsyncThunk } from '@reduxjs/toolkit'
import { addUserApi, fetchUsersApi } from './user.service'
import { userMapper, usersMapper } from './user.mapper'
import { RejectType, ToObjectType } from '../../helper'

export const fetchUsersThunk = createAsyncThunk<UserType[], undefined, RejectType>(
  'users/fetch',
  async (_, thunkApi) => {
    const response = await fetchUsersApi()

    if (response instanceof Error) {
      return thunkApi.rejectWithValue({
        message: response.message,
      })
    }
    return usersMapper(response.users)
  },
)
/**
 * AddTodo API
 */
export const addUserThunk = createAsyncThunk<
  UserType,
  Pick<UserType, 'name' | 'email'>,
  RejectType
>('user/add', async (user, thunkApi) => {
  const addUserApiPayload: ToObjectType<Parameters<typeof addUserApi>> = {
    name: user.name,
    email: user.email,
  }

  const response = await addUserApi(addUserApiPayload)

  if (response instanceof Error) {
    return thunkApi.rejectWithValue({
      message: response.message,
    })
  }
  return userMapper(response.user)
})
