import { InfoApiType, InfoType, TodoApiType, TodoInfoType, TodoType } from './todo.type'

export const todoInfoMapper = (todo: TodoType, info: InfoType): TodoInfoType => ({
  id: todo.id,
  name: todo.name,
  userId: todo.userId,
  idInfo: info.id,
  label: info.label,
  description: info.description,
})

/**
 *
 */
const todoMapper = ({ _id, ...rest }: TodoApiType): TodoType => ({
  id: _id,
  ...rest,
})
const todosMapper = (todos: TodoApiType[]): TodoType[] => todos.map(todoMapper)
type TodosApiTransformType = ({ todos }: { todos: TodoApiType[] }) => TodoType[]
export const todosApiTransform: TodosApiTransformType = ({ todos }) => todosMapper(todos)
type TodoApiTransformType = ({ todo }: { todo: TodoApiType }) => TodoType
export const todoApiTransform: TodoApiTransformType = ({ todo }) => todoMapper(todo)

/**
 *
 */
const infoMapper = ({ _id, ...rest }: InfoApiType): InfoType => ({
  id: _id,
  ...rest,
})
type InfoApiTransformType = ({ info }: { info: InfoApiType }) => InfoType
export const infoApiTransform: InfoApiTransformType = ({ info }) => infoMapper(info)
