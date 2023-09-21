import { AnyAction, combineReducers } from '@reduxjs/toolkit'
import { todoSlice } from './todo'
import { userSlice } from './user'

const combinedReducer = combineReducers({
    [todoSlice.name]: todoSlice.reducer,
    [userSlice.name]: userSlice.reducer,
})

const reducer = (state: StateType | undefined, action: AnyAction) => {
    return combinedReducer(state, action)
}

export type StateType = ReturnType<typeof combinedReducer>
export default reducer
