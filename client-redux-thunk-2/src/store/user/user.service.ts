import axios, {AxiosResponse} from "axios";
const baseUrl = 'http://localhost:4000' as const

type FetchUserApiResponseType = {
    user: UserApiType
}
type AddUserApiResponseType = {
    user: UserApiType
}

const handleErrorApi = (e: unknown, message: string): Error => {
    if (e instanceof Error) {
        return new Error(e.message)
    }
    return new Error(message)
}

export const fetchUserApi = async (id: string): Promise<FetchUserApiResponseType | Error> => {
    try{
        const response: AxiosResponse<FetchUserApiResponseType> = await axios.get(`${baseUrl}/user/${id}`)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch user')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error fetchUserApi')
    }
}

export const addUserApi = async (user: Pick<UserApiType, 'name' | 'email'>): Promise<AddUserApiResponseType | Error> => {
    try{
        const response: AxiosResponse<AddUserApiResponseType> = await axios.post(baseUrl + '/add-user', user)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to add user')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error addUserApi')
    }
}
