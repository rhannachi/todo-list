import axios, {AxiosResponse} from "axios";
const baseUrl = 'http://localhost:4000' as const

type FetchTodosApiResponseType = {
    todos: TodoApiType[]
}
type AddTodoApiResponseType = {
    todo: TodoApiType
}
type UpdateTodoApiResponseType = AddTodoApiResponseType
type DeleteTodoApiResponseType = AddTodoApiResponseType

const handleErrorApi = (e: unknown, message: string): Error => {
    if (e instanceof Error) {
        return new Error(e.message)
    }
    return new Error(message)
}

export const fetchTodosApi = async (): Promise<FetchTodosApiResponseType | Error> => {
    try{
        const response: AxiosResponse<FetchTodosApiResponseType> = await axios.get(baseUrl + '/todos')
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch todos')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error fetchTodosApi')
    }
}

// TODO ....
type AddTodoApiPayloadType = Pick<TodoType, 'name' | 'description'> & {
    status: false
}
export const addTodoApi = async (todo: AddTodoApiPayloadType): Promise<AddTodoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<AddTodoApiResponseType> = await axios.post(baseUrl + '/add-todo', todo)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to add todo')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error addTodoApi')
    }
}

// TODO ....
type UpdateTodoApiPayloadType = Partial<Pick<TodoType, 'name' | 'description' | 'status'>> & Pick<TodoType, '_id'>
export const updateTodoApi = async (todo: UpdateTodoApiPayloadType): Promise<UpdateTodoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<UpdateTodoApiResponseType> = await axios.put(`${baseUrl}/edit-todo/${todo._id}`, todo)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to update todo')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error updateTodoApi')
    }
}

// TODO ....
type DeleteTodoApiPayloadType = Pick<TodoType, '_id'>
export const deleteTodoApi = async (todo: DeleteTodoApiPayloadType): Promise<DeleteTodoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<DeleteTodoApiResponseType> = await axios.delete(`${baseUrl}/delete-todo/${todo._id}`)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to delete todo')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error deleteTodoApi')
    }
}

