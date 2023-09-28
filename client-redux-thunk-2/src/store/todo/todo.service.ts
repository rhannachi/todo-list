import axios, {AxiosResponse} from "axios";
const todoBaseUrl = 'http://localhost:4001' as const
const infoBaseUrl = 'http://localhost:4003' as const

const handleErrorApi = (e: unknown, message: string): Error => {
    if (e instanceof Error) {
        return new Error(e.message)
    }
    return new Error(message)
}
/**
 * Fetch Todos : API
 */
type FetchTodosApiResponseType = {
    todos: TodoApiType[]
}
export const fetchTodosApi = async (): Promise<FetchTodosApiResponseType | Error> => {
    try{
        const response: AxiosResponse<FetchTodosApiResponseType> = await axios.get(todoBaseUrl + '/todos')
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch todos')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error fetchTodosApi')
    }
}
/**
 *  TODO
 */

type AddTodoApiPayloadType = Omit<TodoApiType, '_id'>
type AddTodoApiResponseType = {
    todo: TodoApiType
}
export const addTodoApi = async (todo: AddTodoApiPayloadType): Promise<AddTodoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<AddTodoApiResponseType> = await axios.post(todoBaseUrl + '/add-todo', todo)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to add todo')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error addTodoApi')
    }
}

/**
 * INFO
 */

export type FetchInfoApiResponseType = {
    info: InfoApiType
}
export const fetchInfoApi = async (userId: string): Promise<FetchInfoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<FetchInfoApiResponseType> = await axios.get(`${infoBaseUrl}/info-by-todo-id/${userId}`)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch info')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error fetchInfoApi')
    }
}

type AddInfoApiPayloadType = Omit<InfoApiType, '_id'>
type AddInfoApiResponseType = {
    info: InfoApiType
}
export const addInfoApi = async (info: AddInfoApiPayloadType): Promise<AddInfoApiResponseType | Error> => {
    try{
        const response: AxiosResponse<AddInfoApiResponseType> = await axios.post(infoBaseUrl + '/add-info', info)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to add info')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error addInfoApi')
    }
}




