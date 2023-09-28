import {createSlice} from "@reduxjs/toolkit";
import {addUserThunk, fetchUsersThunk} from "./user.thunk";
import {RootState} from "../index";

type TodosState = {
    status: "loading" | "finished";
    error: string | undefined;
    list: UserType[];
};

const initialState: TodosState = {
    list: [],
    error: undefined,
    status: "finished",
};

export const userSlice = createSlice({
    name: "user",
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
        builder.addCase(fetchUsersThunk.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(fetchUsersThunk.fulfilled,(state, { payload }) => {
            return {
                ...state,
                status:"finished",
                list: payload
            }
        });
        builder.addCase(fetchUsersThunk.rejected,(state, { payload }) => {
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
        /** Fetch USER **/
        // builder.addCase(fetchUserThunk.pending,(state) => {
        //     return {
        //         ...state,
        //         status: 'loading',
        //         error: undefined
        //     }
        // });
        // builder.addCase(fetchUserThunk.fulfilled,(state, { payload }) => {
        //     const exist =  state.list.find((item) => item.id === payload.id)
        //         return {
        //             ...state,
        //             status:"finished",
        //             list: exist ? state.list : [...state.list, payload]
        //         }
        //     });
        // builder.addCase(fetchUserThunk.rejected,(state, { payload }) => {
        //     let newState = {...state}
        //         if (payload) {
        //             newState = {
        //                 ...newState,
        //                 error: payload.message
        //             }
        //         }
        //         return {
        //             ...newState,
        //             status: 'finished'
        //         }
        //     });
        /** ADD User **/
        builder.addCase(addUserThunk.pending,(state) => {
            return {
                ...state,
                status: 'loading',
                error: undefined
            }
        });
        builder.addCase(addUserThunk.fulfilled,(state, { payload }) => {
            return {
                ...state,
                status:"finished",
                list: [...state.list, payload]
            }
        });
        builder.addCase(addUserThunk.rejected,(state, { payload }) => {
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

export const userSelector = (state: RootState) => state.user
