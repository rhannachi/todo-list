import React, { useEffect } from 'react'

import {useAppDispatch, useAppSelector} from "../store";
import {addTodoThunk, fetchTodosThunk, todoSelector} from "../store/todo";
import {userSelector} from "../store/user";
import {AddTodo, FormDataType, TodoItem} from "../components";
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
        console.log({formData})
        e.preventDefault()

        dispatch(addTodoThunk({
            email: formData.email,
            user: formData.user ,
            description: formData.description ,
            label: formData.label ,
            name: formData.name ,
        }))

    }

    return (
        <main className='App'>
            <h1>TODO list</h1>

            <div className="container" >
                <AddTodo saveTodo={saveTodo} />

                <div className='container-user'>
                    <ul>
                        {users.list.map(({id, email}) => (
                            <li key={id}> {email} </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="container-todo">
                <div className="grid-todo" >
                    <h1>TODO</h1>
                    {data.map((item) => (
                        <TodoItem
                             key={item.id} data={item}
                         />
                    ))}
                </div>
                <div className="grid-todo" style={{margin: '0 10px 0 10px'}} >
                    <h1>Progress</h1>
                    <div></div>
                </div>
                <div className="grid-todo" >
                    <h1>Done</h1>
                    <div></div>
                </div>
            </div>
        </main>
    )
}
