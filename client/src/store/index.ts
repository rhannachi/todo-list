import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { todoSlice } from './todo'
import { userSlice } from './user'

const combinedReducer = combineReducers({
  [todoSlice.name]: todoSlice.reducer,
  [userSlice.name]: userSlice.reducer,
})

const reducer = (state: StateType | undefined, action: AnyAction) => {
  return combinedReducer(state, action)
}

type StateType = ReturnType<typeof combinedReducer>

export const store = configureStore<StateType>({ reducer })

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const todoSelector = (state: RootState) => state.todo
export const userSelector = (state: RootState) => state.user
