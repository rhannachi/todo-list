import axios, { AxiosResponse } from 'axios'
import { handleErrorApi } from '../../helper'

const baseUrl = 'http://localhost:4002' as const

/**
 * fetchUsersApi
 */
type FetchUsersApiResponseType = {
  users: UserApiType[]
}
export const fetchUsersApi = async (): Promise<FetchUsersApiResponseType | Error> => {
  try {
    const response: AxiosResponse<FetchUsersApiResponseType> = await axios.get(`${baseUrl}/users`)
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to fetch user')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error fetchUserApi')
  }
}
/**
 * addUserApi
 */
type AddUserApiPayloadType = Pick<UserApiType, 'name' | 'email'>
type AddUserApiResponseType = {
  user: UserApiType
}
export const addUserApi = async (
  user: AddUserApiPayloadType,
): Promise<AddUserApiResponseType | Error> => {
  try {
    const response: AxiosResponse<AddUserApiResponseType> = await axios.post(
      baseUrl + '/add-user',
      user,
    )
    if (response.status !== 200 || !response.data) {
      throw Error('Failed to add user')
    }
    return response.data
  } catch (e) {
    return handleErrorApi(e, 'Error addUserApi')
  }
}
