import axios, {AxiosResponse} from "axios";
const baseUrl = 'http://localhost:4002' as const

const handleErrorApi = (e: unknown, message: string): Error => {
    if (e instanceof Error) {
        return new Error(e.message)
    }
    return new Error(message)
}

type FetchUsersApiResponseType = {
    users: UserApiType[]
}
export const fetchUsersApi = async (): Promise<FetchUsersApiResponseType | Error> => {
    try{
        const response: AxiosResponse<FetchUsersApiResponseType> = await axios.get(`${baseUrl}/users`)
        if (response.status !== 200 || !response.data) {
            throw Error('Failed to fetch user')
        }
        return response.data
    } catch (e) {
        return handleErrorApi(e, 'Error fetchUserApi')
    }
}

// type FetchUserApiResponseType = {
//     user: UserApiType
// }
// export const fetchUserApi = async (id: string): Promise<FetchUserApiResponseType | Error> => {
//     try{
//         const response: AxiosResponse<FetchUserApiResponseType> = await axios.get(`${baseUrl}/user/${id}`)
//         if (response.status !== 200 || !response.data) {
//             throw Error('Failed to fetch user')
//         }
//         return response.data
//     } catch (e) {
//         return handleErrorApi(e, 'Error fetchUserApi')
//     }
// }

type AddUserApiResponseType = {
    user: UserApiType
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
