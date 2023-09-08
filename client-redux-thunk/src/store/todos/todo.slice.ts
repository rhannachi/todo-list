import {createSlice} from "@reduxjs/toolkit";
import {addTodoApi, deleteTodoApi, fetchTodosThunk, updateTodoApi} from "./todo.thunk";
import {RootState} from "../index";

type TodosState = {
    status: "loading" | "finished";
    error: string | undefined;
    list: TodoType[];
};

const initialState: TodosState = {
    list: [],
    error: undefined,
    status: "finished",
};

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // increment(state) {
        //     state.value += 1;
        // },
        // decrement(state) {
        //     state.value -= 1;
        // },
    },
    extraReducers: (builder) => {
        /** FetchTodo **/
        builder.addCase(fetchTodosThunk.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(fetchTodosThunk.fulfilled,(state, { payload }) => {
                return {
                    ...state,
                    status:"finished",
                    list: payload
                }
            });
        builder.addCase(fetchTodosThunk.rejected,(state, { payload }) => {
            let newState = {...state}
                if (payload) {
                    newState = {
                        ...newState,
                        error: payload.message
                    }
                }
                return {
                    ...newState,
                    status: 'finished'
                }
            });
        /** AddTodoApi **/
        builder.addCase(addTodoApi.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(addTodoApi.fulfilled,(state, { payload }) => {
            return {
                ...state,
                status:"finished",
                list: [...state.list, payload]
            }
        });
        builder.addCase(addTodoApi.rejected,(state, { payload }) => {
            let newState = {...state}
            if (payload) {
                newState = {
                    ...newState,
                    error: payload.message
                }
            }
            return {
                ...newState,
                status: 'finished'
            }
        });
        /** UpdateTodoApi **/
        builder.addCase(updateTodoApi.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(updateTodoApi.fulfilled,(state, { payload }) => {
            return {
                ...state,
                status:"finished",
                list: state.list.map((todo) => {
                    if (payload._id === todo._id) {
                        return payload
                    }
                    return todo
                })
            }
        });
        builder.addCase(updateTodoApi.rejected,(state, { payload }) => {
            let newState = {...state}
            if (payload) {
                newState = {
                    ...newState,
                    error: payload.message
                }
            }
            return {
                ...newState,
                status: 'finished'
            }
        });
        /** DeleteTodoApi **/
        builder.addCase(deleteTodoApi.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(deleteTodoApi.fulfilled,(state, { payload }) => {
            return {
                ...state,
                status:"finished",
                list: state.list.filter((todo) => payload._id !== todo._id)
            }
        });
        builder.addCase(deleteTodoApi.rejected,(state, { payload }) => {
            let newState = {...state}
            if (payload) {
                newState = {
                    ...newState,
                    error: payload.message
                }
            }
            return {
                ...newState,
                status: 'finished'
            }
        });
    },
});

export const todosSelector = (state: RootState) => state.todos
