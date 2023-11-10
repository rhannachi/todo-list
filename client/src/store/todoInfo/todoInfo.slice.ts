import { createSlice } from '@reduxjs/toolkit'
import { addTodoInfoThunk, deleteTodoInfoThunk, fetchTodoInfosThunk } from './todoInfo.thunk'
import { TodoInfoType } from './todoInfo.type'
import { ErrorType } from '../../helper'

type TodoInfosState = {
  status: 'loading' | 'finished'
  error?: ErrorType
  list: TodoInfoType[]
}

const initialState: TodoInfosState = {
  list: [],
  status: 'finished',
}

export const todoInfoSlice = createSlice({
  name: 'todoInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** FetchTodoInfo **/
    builder.addCase(fetchTodoInfosThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(fetchTodoInfosThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: payload,
      }
    })
    builder.addCase(fetchTodoInfosThunk.rejected, (state, { payload }) => {
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
    /** AadTodoInfo **/
    builder.addCase(addTodoInfoThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(addTodoInfoThunk.fulfilled, (state, { payload }) => {
      state.status = 'finished'
      state.list.push(payload)
    })
    builder.addCase(addTodoInfoThunk.rejected, (state, { payload }) => {
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
    /** DeleteTodoInfo **/
    builder.addCase(deleteTodoInfoThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(deleteTodoInfoThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: [...state.list].filter((todo) => todo.id !== payload.id),
      }
    })
    builder.addCase(deleteTodoInfoThunk.rejected, (state, { payload }) => {
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
