import { createAsyncThunk } from "@reduxjs/toolkit";
import {addTodoApi, deleteTodoApi, fetchTodosApi, updateTodoApi} from "./todo.service";

type RejectType = {
    rejectValue: {
        message: string
    }
}

/**
 * FetchTodos API
 */

export const fetchTodosThunk = createAsyncThunk<TodoType[], undefined, RejectType>(
    "todos/fetch",
    async (undefined, thunkApi) => {
        const response = await fetchTodosApi()

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return response.todos
    }
);

/**
 * AddTodo API
 */

type AddTodoThunkPayloadType = Pick<TodoType, 'name' | 'description'> & {
    status: false
}
export const addTodoThunk = createAsyncThunk<TodoType, AddTodoThunkPayloadType, RejectType>(
    "todos/add",
    async (todo, thunkApi) => {
        const response = await addTodoApi(todo)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return response.todo
    }
);

/**
 * UpdateTodo API
 */
type UpdateTodoThunkPayloadType = Partial<Pick<TodoType, 'name' | 'description' | 'status'>> & Pick<TodoType, '_id'>
export const updateTodoThunk = createAsyncThunk<TodoType, UpdateTodoThunkPayloadType, RejectType>(
    "todos/update",
    async (todo, thunkApi) => {
        const response = await updateTodoApi(todo)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return response.todo
    }
);

/**
 * DeleteTodo API
 */
type DeleteTodoThunkPayloadType = Pick<TodoType, '_id'>
export const deleteTodoThunk = createAsyncThunk<Pick<TodoType, '_id'>, DeleteTodoThunkPayloadType, RejectType>(
    "todos/delete",
    async (todo, thunkApi) => {
        const response = await deleteTodoApi(todo)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return {_id: response.todo._id}
    }
);