
/**
 * Mapper
 * **/
export const todoMapper = (todo: TodoApiType): TodoType => ({
    id: todo._id,
    name: todo.name,
    description: todo.description,
    status: todo.status
})

export const todosMapper = (todos: TodoApiType[]): TodoType[] => todos.map(todoMapper)

/**
 * Api Mapper
 * **/
//
// const todoApiMapper = (todo: TodoType): TodoApiType => ({
//     _id: todo.id,
//     name: todo.name,
//     description: todo.description,
//     status: todo.status
// })
//
// export const todosApiMapper = (todos: TodoType[]): TodoApiType[] => todos.map(todoApiMapper)
