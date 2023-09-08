import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {fetchTodosApi} from "./todo.service";

const baseUrl = 'http://localhost:4000' as const

type RejectType = {
    rejectValue: {
        message: string
    }
}

// https://jsonplaceholder.typicode.com/todos

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
        return response
    }
);

/**
 * AddTodo API
 */

type AddTodoApiPayloadType = Pick<TodoType, 'name' | 'description'> & {
    status: false
}
export const addTodoApi = createAsyncThunk<TodoType, AddTodoApiPayloadType, RejectType>(
    "todos/add",
    async (todo, thunkApi) => {
        const response: AxiosResponse<ApiDataType> = await axios.post(baseUrl + '/add-todo', todo)

        if (response.status !== 200 || !response.data.todo ) {
            return thunkApi.rejectWithValue({
                message: "Failed to add todo."
            });
        }
        return response.data.todo;
    }
);

/**
 * UpdateTodo API
 */
type UpdateTodoApiPayloadType = Partial<Pick<TodoType, 'name' | 'description' | 'status'>> & Pick<TodoType, '_id'>
export const updateTodoApi = createAsyncThunk<TodoType, UpdateTodoApiPayloadType, RejectType>(
    "todos/update",
    async (todo, thunkApi) => {
        const response: AxiosResponse<ApiDataType> = await axios.put(`${baseUrl}/edit-todo/${todo._id}`, todo)

        if (response.status !== 200 || !response.data.todo ) {
            return thunkApi.rejectWithValue({
                message: "Failed to update todo."
            });
        }
        return response.data.todo;
    }
);

/**
 * DeleteTodo API
 */
type DeleteTodoApiPayloadType = Pick<TodoType, '_id'>
export const deleteTodoApi = createAsyncThunk<Pick<TodoType, '_id'>, DeleteTodoApiPayloadType, RejectType>(
    "todos/delete",
    async (todo, thunkApi) => {
        const response: AxiosResponse<ApiDataType> = await axios.delete(`${baseUrl}/delete-todo/${todo._id}`)

        if (response.status !== 200 || !response.data.todo ) {
            return thunkApi.rejectWithValue({
                message: "Failed to delete todo."
            });
        }
        return {
            _id: response.data.todo._id
        };
    }
);