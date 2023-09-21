import { createAsyncThunk } from "@reduxjs/toolkit";
import {fetchInfoApi, fetchTodosApi} from "./todo.service";
import {TodoTypeMapper} from "./todo.mapper";
import {fetchUserThunk} from "../user";

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
        const todosResponse = await fetchTodosApi()

        if (todosResponse instanceof Error) {
            return thunkApi.rejectWithValue({
                message: todosResponse.message
            });
        }

        todosResponse.todos.map(({userId}) => thunkApi.dispatch(fetchUserThunk(userId)))

        const fetchInfosApiPromise = todosResponse.todos.map(({_id}) => fetchInfoApi(_id))
        const infosResponse = (await Promise.all(fetchInfosApiPromise)).reduce((acc: InfoApiType[], item) => {
            if (item instanceof Error) {
                // TODO check return error
                return acc
            }
            return [...acc, item.info]
        }, [])

        const todos = todosResponse.todos.reduce((acc: TodoType[], todo) => {
            const info = infosResponse.find(({todoId}) => todoId === todo._id)
            if (info) {
                return [...acc, TodoTypeMapper(todo, info)]
            }

            return acc
        }, [])

        // TODO ...
        return todos
    }
);

/**
 * AddTodo API
 */

// export const addTodoThunk = createAsyncThunk<TodoType, Omit<TodoType, 'id'>, RejectType>(
//     "todos/add",
//     async (todo, thunkApi) => {
//
//         const addTodoApiPayload: Parameters<typeof addTodoApi> = [{
//             name: todo.name,
//             description: todo.description,
//             status: todo.status
//         }]
//
//         const response = await addTodoApi(...addTodoApiPayload)
//
//         if (response instanceof Error) {
//             return thunkApi.rejectWithValue({
//                 message: response.message
//             });
//         }
//         return todoMapper(response.todo)
//     }
// );
