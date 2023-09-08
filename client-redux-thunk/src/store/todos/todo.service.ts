import axios, {AxiosResponse} from "axios";
const baseUrl = 'http://localhost:4000' as const

const handleErrorApi = (e: unknown, message: string): Error => {
    if (e instanceof Error) {
        return new Error(e.message)
    }
    return new Error(message)
}

export const fetchTodosApi = async (): Promise<TodoType[] | Error> => {
    try{
        const response: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/todos')
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch todos')
        }
        return response.data.todos
    } catch (e) {
        return handleErrorApi(e, 'Error fetchTodosApi')
    }
}