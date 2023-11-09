import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { todoInfoSlice } from './todoInfo'
import { userSlice } from './user'

const combinedReducer = combineReducers({
  [todoInfoSlice.name]: todoInfoSlice.reducer,
  [userSlice.name]: userSlice.reducer,
})

const reducer = (state: StateType | undefined, action: AnyAction) => combinedReducer(state, action)

type StateType = ReturnType<typeof combinedReducer>

export const store = configureStore<StateType>({ reducer })

type AppDispatch = typeof store.dispatch
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const todoInfoSelector = (state: RootState) => state.todoInfo
export const userSelector = (state: RootState) => state.user
