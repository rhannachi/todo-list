import { TodoListProps } from '../components'
import { UserType } from '../store/user/user.type'
import { TodoInfoType } from '../store/todo/todo.type'

export const todoListPropsMapper = (
  todos: TodoInfoType[],
  users: UserType[],
): TodoListProps['todoList'] => {
  return todos.map((todo) => ({
    id: todo.id,
    name: todo.name,
    idInfo: todo.idInfo,
    label: todo.label,
    description: todo.description,
    user: users.find((user) => user.id === todo.userId),
  }))
}
