import React from 'react'

export type ItemTodoProps = {
    data: Omit<TodoType, 'userId'> & {
        user: UserType | undefined
    }
    // updateTodo: (todo: TodoType) => void
    // deleteTodo: (id: string) => void
}

export const ItemTodo: React.FC<ItemTodoProps> = ({ data: {name, label, description, user} }) => {
  return (
    <div className='Card'>
        <div className="Card--text">
            <h1>{name}</h1>
            <div>{label}</div>
            <div>{description}</div>
        </div>
        <div className="Card--text">
            <h1>{user?.name}</h1>
            <div>{user?.email}</div>
        </div>
    </div>
  )
}
