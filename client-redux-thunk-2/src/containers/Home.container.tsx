import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { addTodoThunk, deleteTodoThunk, fetchTodosThunk, todoSelector } from '../store/todo'
import { fetchUsersThunk, userSelector } from '../store/user'
import { AddTodo, TodoList, UserList } from '../components'
import { todoListPropsMapper } from './home.mapper'
import { ToObjectType } from '../helper'

export type HandleSaveTodoParametersType = ToObjectType<Parameters<typeof addTodoThunk>>
export type HandleDeleteTodoFunctionType = ToObjectType<Parameters<typeof deleteTodoThunk>>

export const HomeContainer: React.FC = () => {
  const todos = useAppSelector(todoSelector)
  const users = useAppSelector(userSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodosThunk())
    dispatch(fetchUsersThunk())
  }, [])

  const handleSaveTodo = ({
    email,
    user,
    description,
    label,
    name,
  }: HandleSaveTodoParametersType) => {
    dispatch(
      addTodoThunk({
        email,
        user,
        description,
        label,
        name,
      }),
    )
  }

  const handleDeleteTodo = ({ idTodo, idInfo }: HandleDeleteTodoFunctionType) => {
    dispatch(
      deleteTodoThunk({
        idTodo,
        idInfo,
      }),
    )
  }

  const todoList = todoListPropsMapper(todos.list, users.list)

  return (
    <main className='App'>
      <h1>TODO list</h1>
      <div className='container'>
        <AddTodo saveTodo={handleSaveTodo} />
        <UserList userList={users.list} />
      </div>
      <TodoList deleteTodo={handleDeleteTodo} todoList={todoList} />
    </main>
  )
}
