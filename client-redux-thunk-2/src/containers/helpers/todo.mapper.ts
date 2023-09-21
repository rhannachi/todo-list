import {ItemTodoProps} from "../../components";

export const itemTodoPropsDataArrayMapper = (todos: TodoType[], users: UserType[]): ItemTodoProps['data'][] => {
    return todos.map((todo) => ({
        id: todo.id,
        name: todo.name,
        label: todo.label,
        description: todo.description,
        user: users.find((user) => user.id === todo.userId),
    }))
}