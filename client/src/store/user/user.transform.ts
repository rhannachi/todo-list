import { UserApiType, UserType } from './user.type'

const userMapper = (user: UserApiType): UserType => ({
  id: user._id,
  name: user.name,
  email: user.email,
})
const usersMapper = (users: UserApiType[]): UserType[] => users.map(userMapper)

/**
 *
 */
type UsersApiTransformType = ({ users }: { users: UserApiType[] }) => UserType[]
export const usersApiTransform: UsersApiTransformType = ({ users }) => usersMapper(users)

/**
 *
 */
type UserApiTransformType = ({ user }: { user: UserApiType }) => UserType
export const userApiTransform: UserApiTransformType = ({ user }) => userMapper(user)
