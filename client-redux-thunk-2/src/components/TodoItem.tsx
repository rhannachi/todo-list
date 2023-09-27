import React from 'react'

export type TodoItemProps = {
    data: Omit<TodoType, 'userId'> & {
        user: UserType | undefined
    }
}

export const TodoItem: React.FC<TodoItemProps> = ({ data: {name, label, description, user} }) => {
  return (
        <div className="todo-item">
            <h3>{name}</h3>
            <div>{label}</div>
            <div>{description}</div>
            <h4>{user?.name}</h4>
            <div>{user?.email}</div>
        </div>
  )
}
