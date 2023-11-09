import React from 'react'
import { DeleteTodoInfoThunkPayloadType, TodoInfoType } from '../store/todoInfo'
import { UserType } from '../store/user'

type DeleteTodoInfoFunctionType = {
  deleteTodoInfo: ({ idTodo, idInfo }: DeleteTodoInfoThunkPayloadType) => void
}

type TodoInfoItemProps = Omit<TodoInfoType, 'userId'> & {
  user?: UserType
}

export type TodoInfoListProps = {
  todoInfoList: TodoInfoItemProps[]
}

const TodoInfoItem: React.FC<TodoInfoItemProps & DeleteTodoInfoFunctionType> = ({
  id,
  idInfo,
  name,
  label,
  description,
  user,
  deleteTodoInfo,
}) => (
  <div className='todo-item'>
    <div className='delete-icon' onClick={() => deleteTodoInfo({ idTodo: id, idInfo })}>
      X
    </div>
    <h3>{name}</h3>
    <div>{label}</div>
    <div>{description}</div>
    <h4>{user?.name}</h4>
    <div>{user?.email}</div>
  </div>
)

export const TodoInfoList: React.FC<TodoInfoListProps & DeleteTodoInfoFunctionType> = ({
  todoInfoList,
  deleteTodoInfo,
}) => {
  return (
    <div className='container-todo'>
      <div className='grid-todo'>
        <h1>TODO</h1>
        {todoInfoList.map((item) => (
          <TodoInfoItem key={item.id} {...item} deleteTodoInfo={deleteTodoInfo} />
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
