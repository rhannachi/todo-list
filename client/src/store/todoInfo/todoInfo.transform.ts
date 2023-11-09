import { InfoApiType, InfoType, TodoApiType, TodoInfoType, TodoType } from './todoInfo.type'

type TodosApiTransformType = ({ todos }: { todos: TodoApiType[] }) => TodoType[]
type TodoApiTransformType = ({ todo }: { todo: TodoApiType }) => TodoType
type InfoApiTransformType = ({ info }: { info: InfoApiType }) => InfoType

const infoMapper = ({ _id, ...rest }: InfoApiType): InfoType => ({
  id: _id,
  ...rest,
})
const todoMapper = ({ _id, ...rest }: TodoApiType): TodoType => ({
  id: _id,
  ...rest,
})
const todosMapper = (todos: TodoApiType[]): TodoType[] => todos.map(todoMapper)

export const todoInfoMapper = (todo: TodoType, info: InfoType): TodoInfoType => ({
  id: todo.id,
  name: todo.name,
  userId: todo.userId,
  idInfo: info.id,
  label: info.label,
  description: info.description,
})
export const todosApiTransform: TodosApiTransformType = ({ todos }) => todosMapper(todos)
export const todoApiTransform: TodoApiTransformType = ({ todo }) => todoMapper(todo)
export const infoApiTransform: InfoApiTransformType = ({ info }) => infoMapper(info)
