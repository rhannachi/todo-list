import React, { useEffect } from 'react'
import { todoInfoSelector, useAppDispatch, useAppSelector, userSelector } from '../store'
import {
  addTodoInfoThunk,
  AddTodoInfoThunkPayloadType,
  deleteTodoInfoThunk,
  DeleteTodoInfoThunkPayloadType,
  fetchTodoInfosThunk,
} from '../store/todoInfo'
import { fetchUsersThunk } from '../store/user'
import { AddTodoInfo, TodoInfoList, UserList } from '../components'
import { todoInfoListPropsMapper } from './home.mapper'

export const HomeContainer: React.FC = () => {
  const todoInfos = useAppSelector(todoInfoSelector)
  const users = useAppSelector(userSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodoInfosThunk())
    dispatch(fetchUsersThunk())
  }, [])

  const handleAddTodoInfo = ({
    email,
    user,
    description,
    label,
    name,
  }: AddTodoInfoThunkPayloadType) => {
    dispatch(
      addTodoInfoThunk({
        email,
        user,
        description,
        label,
        name,
      }),
    )
  }

  const handleDeleteTodoInfo = ({ idTodo, idInfo }: DeleteTodoInfoThunkPayloadType) => {
    dispatch(
      deleteTodoInfoThunk({
        idTodo,
        idInfo,
      }),
    )
  }

  const todoInfoList = todoInfoListPropsMapper(todoInfos.list, users.list)

  return (
    <main className='App'>
      <h1>TODO list</h1>
      <div className='container'>
        <AddTodoInfo addTodoInfo={handleAddTodoInfo} />
        <UserList userList={users.list} />
      </div>
      <TodoInfoList deleteTodoInfo={handleDeleteTodoInfo} todoInfoList={todoInfoList} />
    </main>
  )
}
