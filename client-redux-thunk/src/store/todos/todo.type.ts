type TodoApiType = {
  _id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

type TodoType = Pick<TodoApiType, 'name' | 'description' | 'status'> & {
  id: string
}