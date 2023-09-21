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
 * Fetch Info by userId : API
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


// type AddTodoApiPayloadType = Omit<TodoApiType, '_id'>
// type AddTodoApiResponseType = {
//     todo: TodoApiType
// }
// export const addTodoApi = async (todo: AddTodoApiPayloadType): Promise<AddTodoApiResponseType | Error> => {
//     try{
//         const response: AxiosResponse<AddTodoApiResponseType> = await axios.post(baseUrl + '/add-todo', todo)
//         if (response.status !== 200 || !response.data) {
//             throw Error('Failed to add todo')
//         }
//         return response.data
//     } catch (e) {
//         return handleErrorApi(e, 'Error addTodoApi')
//     }
// }


