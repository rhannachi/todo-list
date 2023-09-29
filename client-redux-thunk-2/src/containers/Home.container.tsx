import React, { useEffect } from 'react'
import {useAppDispatch, useAppSelector} from "../store";
import {addTodoThunk, fetchTodosThunk, todoSelector} from "../store/todo";
import {fetchUsersThunk, userSelector} from "../store/user";
import {AddTodo, TodoList, UserList} from "../components";
import {todoListPropsMapper} from "./home.mapper";
import {ToObjectType} from "../helper";

export type HandleSaveTodoParametersType = ToObjectType<Parameters<typeof addTodoThunk>>

export const HomeContainer: React.FC = () => {
    const todos = useAppSelector(todoSelector);
    const users = useAppSelector(userSelector);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodosThunk())
        dispatch(fetchUsersThunk())
    }, [])

    const handleSaveTodo = (data: HandleSaveTodoParametersType) => {
        dispatch(addTodoThunk({
            email: data.email ,
            user: data.user ,
            description: data.description ,
            label: data.label ,
            name: data.name ,
        }))
    }

    const todoList = todoListPropsMapper(todos.list, users.list)

    return (
        <main className='App'>
            <h1>TODO list</h1>
            <div className="container" >
                <AddTodo saveTodo={handleSaveTodo} />
                <UserList userList={users.list} />
            </div>
            <TodoList todoList={todoList} />
        </main>
    )
}
