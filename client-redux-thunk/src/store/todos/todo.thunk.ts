import { createAsyncThunk } from "@reduxjs/toolkit";
import {addTodoApi, deleteTodoApi, fetchTodosApi, updateTodoApi} from "./todo.service";
import {todoMapper, todosMapper} from "./todo.mapper";

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
        return todosMapper(response.todos)
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

        const addTodoApiPayload: Parameters<typeof addTodoApi> = [{
            name: todo.name,
            description: todo.description,
            status: todo.status
        }]

        const response = await addTodoApi(...addTodoApiPayload)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return todoMapper(response.todo)
    }
);

/**
 * UpdateTodo API
 */
type UpdateTodoThunkPayloadType = Partial<Pick<TodoType, 'name' | 'description' | 'status'>> & Pick<TodoType, 'id'>
export const updateTodoThunk = createAsyncThunk<TodoType, UpdateTodoThunkPayloadType, RejectType>(
    "todos/update",
    async (todo, thunkApi) => {

        const updateTodoApiPayload: Parameters<typeof updateTodoApi> = [{
            _id: todo.id,
            name: todo.name,
            description: todo.description,
            status: todo.status
        }]

        const response = await updateTodoApi(...updateTodoApiPayload)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return todoMapper(response.todo)
    }
);

/**
 * DeleteTodo API
 */
type DeleteTodoThunkPayloadType = Pick<TodoType, 'id'>
export const deleteTodoThunk = createAsyncThunk<Pick<TodoType, 'id'>, DeleteTodoThunkPayloadType, RejectType>(
    "todos/delete",
    async (todo, thunkApi) => {

        const deleteTodoApiPayload: Parameters<typeof deleteTodoApi> = [{
            _id: todo.id,
        }]

        const response = await deleteTodoApi(...deleteTodoApiPayload)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return {id: response._id}
    }
);