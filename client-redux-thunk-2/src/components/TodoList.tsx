import React from 'react'

type TodoItemProps = Omit<TodoType, 'userId'> & { user?: UserType }

export type TodoListProps = {
  todoList: TodoItemProps[]
}

const TodoItem: React.FC<TodoItemProps> = ({ name, label, description, user }) => (
  <div className='todo-item'>
    <h3>{name}</h3>
    <div>{label}</div>
    <div>{description}</div>
    <h4>{user?.name}</h4>
    <div>{user?.email}</div>
  </div>
)

export const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  return (
    <div className='container-todo'>
      <div className='grid-todo'>
        <h1>TODO</h1>
        {todoList.map((item) => (
          <TodoItem key={item.id} {...item} />
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
