//
// export const todoMapper = (todo: TodoApiType): TodoType => ({
//     id: todo._id,
//     name: todo.name,
//     label: todo.label,
//     description: todo.description,
//     userId: todo.userId
// })
//
// export const todosMapper = (todos: TodoApiType[]): TodoType[] => todos.map(todoMapper)


export const todoTransform = (todo: TodoApiType, info: InfoApiType): TodoType => ({
    id: todo._id,
    name: todo.name,
    userId: todo.userId,
    label: info.label,
    description: info.description,
    todoId: info.todoId
})