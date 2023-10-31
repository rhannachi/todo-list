import { createSlice } from '@reduxjs/toolkit'
import { addUserThunk, fetchUsersThunk } from './user.thunk'

type TodosState = {
  status: 'loading' | 'finished'
  error: string | undefined
  list: UserType[]
}

const initialState: TodosState = {
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
          error: payload.message,
        }
      }
      return {
        ...newState,
        status: 'finished',
      }
    })
    /** ADD User **/
    builder.addCase(addUserThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(addUserThunk.fulfilled, (state, { payload }) => {
      const newState: TodosState = {
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
    builder.addCase(addUserThunk.rejected, (state, { payload }) => {
      let newState = { ...state }
      if (payload) {
        newState = {
          ...newState,
          error: payload.message,
        }
      }
      return {
        ...newState,
        status: 'finished',
      }
    })
  },
})
