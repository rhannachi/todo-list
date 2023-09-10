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
          id: todo.id,
          status: true
      }))
  }

  const handleDeleteTodo = (id: string): void => {
      dispatch(deleteTodoThunk({
          id
      }))
  }

  return (
    <main className='App'>
      <h1>To-do list</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.list.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App