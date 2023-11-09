import { TodoInfoListProps } from '../components'
import { UserType } from '../store/user'
import { TodoInfoType } from '../store/todoInfo'

export const todoInfoListPropsMapper = (
  todos: TodoInfoType[],
  users: UserType[],
): TodoInfoListProps['todoInfoList'] => {
  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    idInfo: todo.idInfo,
    label: todo.label,
    description: todo.description,
    user: users.find((user) => user.id === todo.userId),
  }))
}
