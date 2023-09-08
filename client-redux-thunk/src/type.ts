type TodoType = {
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

type ApiDataType = {
  message: string
  status: string
  todos: TodoType[]
  todo?: TodoType
}