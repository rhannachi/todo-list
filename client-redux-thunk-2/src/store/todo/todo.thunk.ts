import { createAsyncThunk } from "@reduxjs/toolkit";
import {addInfoApi, addTodoApi, fetchInfoApi, fetchTodosApi} from "./todo.service";
import {TodoTypeMapper} from "./todo.mapper";
import {addUserThunk} from "../user";

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

        // // get user ids
        // const usersId = todosResponse.todos.reduce((acc: string[], { userId }:  TodoApiType) => {
        //     const exist = acc.includes(userId)
        //     if (!exist) {
        //         acc.push(userId)
        //     }
        //     return acc
        // }, [])
        //
        // // call fetch user
        // usersId.map(async (userId) => thunkApi.dispatch(fetchUserThunk(userId)))

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

type AddTodoThunkPayloadType = {
    name: string
    label: string
    description: string
    email: string
    user: string
}

export const addTodoThunk = createAsyncThunk<TodoType, AddTodoThunkPayloadType, RejectType>(
    "todos/add",
    async (data, thunkApi) => {

        const userResponse = await thunkApi.dispatch(addUserThunk({
            name: data.user,
            email: data.email
        }))

        if (userResponse.type !== 'user/add/fulfilled') {
            return thunkApi.rejectWithValue({
                message: 'error add user' // TODO ...
            });
        }

        /////////////

        const addTodoApiPayload: Parameters<typeof addTodoApi> = [{
            name: data.name,
            userId: (userResponse.payload as UserType).id // TODO improvement
        }]

        const todoResponse = await addTodoApi(...addTodoApiPayload)

        if (todoResponse instanceof Error) {
            return thunkApi.rejectWithValue({
                message: todoResponse.message
            });
        }

        /////////////

        const addInfoApiPayload: Parameters<typeof addInfoApi> = [{
            label: data.label,
            description: data.description,
            todoId: todoResponse.todo._id
        }]

        const infoResponse = await addInfoApi(...addInfoApiPayload)

        if (infoResponse instanceof Error) {
            return thunkApi.rejectWithValue({
                message: infoResponse.message
            });
        }

        return TodoTypeMapper(todoResponse.todo, infoResponse.info)
    }
);
