import React, { useEffect } from 'react'

import {useAppDispatch, useAppSelector} from "./store";
import {fetchTodosThunk, addTodoThunk, todosSelector, updateTodoThunk, deleteTodoThunk} from "./store/todos";
import {AddTodo, TodoItem} from "./components";

const App: React.FC = () => {
    const todos = useAppSelector(todosSelector);
    const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchTodosThunk())
  }, [])

 const handleSaveTodo = (e: React.FormEvent, todo: TodoType): void => {
      e.preventDefault()
     dispatch(addTodoThunk({
         ...todo,
         status: false
     }))
}

  const handleUpdateTodo = (todo: TodoType): void => {
      dispatch(updateTodoThunk({
          _id: todo._id,
          status: true
      }))
  }

  const handleDeleteTodo = (_id: string): void => {
      dispatch(deleteTodoThunk({
          _id,
      }))
  }

  return (
    <main className='App'>
      <h1>To-do list</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.list.map((todo: TodoType) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App