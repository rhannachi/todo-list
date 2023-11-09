import { createSlice } from '@reduxjs/toolkit'
import { createUserThunk, fetchUsersThunk } from './user.thunk'
import { UserType } from './user.type'
import { ErrorType } from '../../helper'

type UsersState = {
  status: 'loading' | 'finished'
  error: ErrorType | undefined
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
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(fetchUsersThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: payload,
      }
    })
    builder.addCase(fetchUsersThunk.rejected, (state, { payload }) => {
      let newState = { ...state }
      if (payload) {
        newState = {
          ...newState,
          error: {
            ...payload,
          },
        }
      }
      return {
        ...newState,
        status: 'finished',
      }
    })
    /** ADD User **/
    builder.addCase(createUserThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(createUserThunk.fulfilled, (state, { payload }) => {
      const newState: UsersState = {
        ...state,
        status: 'finished',
      }

      const exist = state.list.find((user) => user.email === payload.email)

      if (!exist) {
        return {
          ...newState,
          list: [...state.list, payload],
        }
      }
      return {
        ...newState,
        list: [...state.list],
      }
    })
    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      let newState = { ...state }
      if (payload) {
        newState = {
          ...newState,
          error: { ...payload },
        }
      }
      return {
        ...newState,
        status: 'finished',
      }
    })
  },
})
