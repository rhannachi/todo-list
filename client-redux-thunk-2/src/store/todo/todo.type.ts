type TodoApiType = {
  _id: string
  name: string
  userId: string
}

type InfoApiType = {
  _id: string
  label: string
  description: string
  todoId: string
}

type TodoType = Omit<TodoApiType, '_id'> & Omit<InfoApiType, '_id' | 'todoId'> & {
  id: string
}
