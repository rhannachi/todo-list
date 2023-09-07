import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";

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

export const fetchTodosApi = createAsyncThunk<ITodo[], undefined, RejectType>(
    "todos/fetch",
    async (undefined, thunkApi) => {
        const response: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/todos')

        if (response.status !== 200 || !response.data) {
            return thunkApi.rejectWithValue({
                message: "Failed to fetch todos."
            });
        }
        return response.data.todos;
    }
);

/**
 * AddTodo API
 */

type AddTodoApiPayloadType = Pick<ITodo, 'name' | 'description'> & {
    status: false
}
export const addTodoApi = createAsyncThunk<ITodo, AddTodoApiPayloadType, RejectType>(
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
type UpdateTodoApiPayloadType = Partial<Pick<ITodo, 'name' | 'description' | 'status'>> & Pick<ITodo, '_id'>
export const updateTodoApi = createAsyncThunk<ITodo, UpdateTodoApiPayloadType, RejectType>(
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
type DeleteTodoApiPayloadType = Pick<ITodo, '_id'>
export const deleteTodoApi = createAsyncThunk<Pick<ITodo, '_id'>, DeleteTodoApiPayloadType, RejectType>(
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