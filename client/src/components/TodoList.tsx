import React from 'react'
import { DeleteTodoThunkPayloadType } from '../store/todo'
import { UserType } from '../store/user/user.type'
import { TodoInfoType } from '../store/todo/todo.type'

type DeleteTodoFunctionType = {
  deleteTodo: ({ idTodo, idInfo }: DeleteTodoThunkPayloadType) => void
}

type TodoItemProps = Omit<TodoInfoType, 'userId'> & {
  user?: UserType
}

export type TodoListProps = {
  todoList: TodoItemProps[]
}

const TodoItem: React.FC<TodoItemProps & DeleteTodoFunctionType> = ({
  id,
  idInfo,
  name,
  label,
  description,
  user,
  deleteTodo,
}) => (
  <div className='todo-item'>
    <div className='delete-icon' onClick={() => deleteTodo({ idTodo: id, idInfo })}>
      X
    </div>
    <h3>{name}</h3>
    <div>{label}</div>
    <div>{description}</div>
    <h4>{user?.name}</h4>
    <div>{user?.email}</div>
  </div>
)

export const TodoList: React.FC<TodoListProps & DeleteTodoFunctionType> = ({
  todoList,
  deleteTodo,
}) => {
  return (
    <div className='container-todo'>
      <div className='grid-todo'>
        <h1>TODO</h1>
        {todoList.map((item) => (
          <TodoItem key={item.id} {...item} deleteTodo={deleteTodo} />
        ))}
      </div>
      <div className='grid-todo' style={{ margin: '0 10px 0 10px' }}>
        <h1>Progress</h1>
        <div></div>
      </div>
      <div className='grid-todo'>
        <h1>Done</h1>
        <div></div>
      </div>
    </div>
  )
}
