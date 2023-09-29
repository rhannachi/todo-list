export const TodoTypeMapper = (todo: TodoApiType, info: InfoApiType): TodoType => ({
  id: todo._id,
  name: todo.name,
  userId: todo.userId,
  label: info.label,
  description: info.description,
})
