import { InfoApiType, TodoApiType, TodoInfoType, TodoType } from './todo.type'

export const TodoTypeMapper = (todo: TodoType | TodoApiType, info: InfoApiType): TodoInfoType => ({
  id: '_id' in todo ? todo._id : todo.id, // TODO remove this !!!!!!
  name: todo.name,
  userId: todo.userId,
  idInfo: info._id,
  label: info.label,
  description: info.description,
})

/**
 *
 */

const todoMapper = (todo: TodoApiType): TodoType => ({
  id: todo._id,
  name: todo.name,
  userId: todo.userId,
})
const todosMapper = (todos: TodoApiType[]): TodoType[] => todos.map(todoMapper)
type TodosApiTransformType = ({ todos }: { todos: TodoApiType[] }) => TodoType[]
export const todosApiTransform: TodosApiTransformType = ({ todos }) => todosMapper(todos)
