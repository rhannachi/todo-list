import React, { useEffect } from 'react'

import {useAppDispatch, useAppSelector} from "../store";
import {fetchTodosThunk, todoSelector} from "../store/todo";
import {userSelector} from "../store/user";
import {AddTodo, FormDataType, ItemTodo, ItemTodoProps} from "../components";
import {itemTodoPropsDataArrayMapper} from "./helpers";

export const TodoContainer: React.FC = () => {
    const todos = useAppSelector(todoSelector);
    const users = useAppSelector(userSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk())
    }, [])

//  const handleSaveTodo = (e: React.FormEvent, todo: UserType): void => {
//       e.preventDefault()
//      dispatch(addTodoThunk({
//          ...todo,
//          status: false
//      }))
// }

    // const handleUpdateTodo = (todo: UserType): void => {
    //     dispatch(updateTodoThunk({
    //         id: todo.id,
    //         status: true
    //     }))
    // }

    // const handleDeleteTodo = (id: string): void => {
    //     dispatch(deleteTodoThunk({
    //         id
    //     }))
    // }

    const data = itemTodoPropsDataArrayMapper(todos.list, users.list)

    const saveTodo = (e: React.FormEvent, formData: FormDataType) => {
        console.log("save Todo")
        console.log({formData})
        e.preventDefault()
    }

    return (
        <main className='App'>
            <h1>TODO list</h1>
            <AddTodo saveTodo={saveTodo} />
            {data.map((item) => (
                <ItemTodo
                    key={item.id}
                    data={item}
                    // updateTodo={handleUpdateTodo}
                    // deleteTodo={handleDeleteTodo}
                />
            ))}
        </main>
    )
}
