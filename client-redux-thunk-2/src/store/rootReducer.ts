import { AnyAction, combineReducers } from '@reduxjs/toolkit'
import { todosSlice } from './todo'
import { userSlice } from './user'

const combinedReducer = combineReducers({
    [todosSlice.name]: todosSlice.reducer,
    [userSlice.name]: userSlice.reducer,
})

const reducer = (state: StateType | undefined, action: AnyAction) => {
    return combinedReducer(state, action)
}

export type StateType = ReturnType<typeof combinedReducer>
export default reducer
