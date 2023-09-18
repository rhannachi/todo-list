type TodoApiType = {
  _id: string
  name: string
  userId: string
}

type InfoApiType = {
  _id: string
  label: boolean
  description: string
  todoId: string
}

type TodoType = Omit<TodoApiType, '_id'> & Omit<InfoApiType, '_id'> & {
  id: string
}
