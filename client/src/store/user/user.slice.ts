import { createSlice } from '@reduxjs/toolkit'
import { createUserThunk, fetchUsersThunk } from './user.thunk'
import { UserType } from './user.type'
import { ErrorType } from '../../helper'

type UsersState = {
  status: 'loading' | 'finished'
  error?: ErrorType
  list: UserType[]
}

const initialState: UsersState = {
  list: [],
  error: undefined,
  status: 'finished',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** FETCH Users **/
    builder.addCase(fetchUsersThunk.pending, (state) => {
      state.status = 'loading'
      state.error = undefined
    })
    builder.addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
      state.status = 'finished'
      state.list = payload
    })
    builder.addCase(fetchUsersThunk.rejected, (state, { payload }) => {
      state.status = 'finished'
      if (payload) {
        state.error = payload
      }
    })
    /** ADD User **/
    builder.addCase(createUserThunk.pending, (state) => {
      state.status = 'loading'
      state.error = undefined
    })
    builder.addCase(createUserThunk.fulfilled, (state, { payload }) => {
      state.status = 'finished'
      if (!state.list.find((user) => user.email === payload.email)) {
        state.list = state.list.concat(payload)
      }
    })
    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      state.status = 'finished'
      if (payload) {
        state.error = payload
      }
    })
  },
})
