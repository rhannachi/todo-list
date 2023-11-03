import { createSlice } from '@reduxjs/toolkit'
import { addTodoThunk, deleteTodoThunk, fetchTodosThunk } from './todo.thunk'
import { TodoInfoType } from './todo.type'
import { ErrorType } from '../../helper'

type TodosState = {
  status: 'loading' | 'finished'
  error: ErrorType | undefined
  list: TodoInfoType[]
}

const initialState: TodosState = {
  list: [],
  error: undefined,
  status: 'finished',
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Fetch TODOS **/
    builder.addCase(fetchTodosThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: payload,
      }
    })
    builder.addCase(fetchTodosThunk.rejected, (state, { payload }) => {
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
    /** ADD TODO **/
    builder.addCase(addTodoThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(addTodoThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: [...state.list, payload],
      }
    })
    builder.addCase(addTodoThunk.rejected, (state, { payload }) => {
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
    /** Delete TODO **/
    builder.addCase(deleteTodoThunk.pending, (state) => {
      return {
        ...state,
        status: 'loading',
        error: undefined,
      }
    })
    builder.addCase(deleteTodoThunk.fulfilled, (state, { payload }) => {
      return {
        ...state,
        status: 'finished',
        list: [...state.list].filter((todo) => todo.id !== payload.id),
      }
    })
    builder.addCase(deleteTodoThunk.rejected, (state, { payload }) => {
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
