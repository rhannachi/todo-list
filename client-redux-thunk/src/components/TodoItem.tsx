import React from 'react'

type TodoItemProps = {
    todo: TodoType
    updateTodo: (todo: TodoType) => void
    deleteTodo: (id: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ''
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1 className={checkTodo}>{todo.name}</h1>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : 'Card--button__done'}
        >
          Complete
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
