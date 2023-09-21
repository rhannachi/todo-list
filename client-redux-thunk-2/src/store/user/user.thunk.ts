import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserApi } from "./user.service";
import {userMapper} from "./user.mapper";

type RejectType = {
    rejectValue: {
        message: string
    }
}

/**
 * FetchTodos API
 */
export const fetchUserThunk = createAsyncThunk<UserType, string, RejectType>(
    "user/fetch",
    async (id, thunkApi) => {
        const response = await fetchUserApi(id)

        if (response instanceof Error) {
            return thunkApi.rejectWithValue({
                message: response.message
            });
        }
        return userMapper(response.user)
    }
);

/**
 * AddTodo API
 */

// export const addUserThunk = createAsyncThunk<UserType, Pick<UserType, 'name' | 'email'>, RejectType>(
//     "user/add",
//     async (user, thunkApi) => {
//
//         const addUserApiPayload: Parameters<typeof addUserApi> = [{
//             name: user.name,
//             email: user.email
//         }]
//
//         const response = await addUserApi(...addUserApiPayload)
//
//         if (response instanceof Error) {
//             return thunkApi.rejectWithValue({
//                 message: response.message
//             });
//         }
//         return userMapper(response.user)
//     }
// );
