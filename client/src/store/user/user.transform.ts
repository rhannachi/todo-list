import { UserApiType, UserType } from './user.type'

type UsersApiTransformType = ({ users }: { users: UserApiType[] }) => UserType[]
type UserApiTransformType = ({ user }: { user: UserApiType }) => UserType

const userMapper = (user: UserApiType): UserType => ({
  id: user._id,
  name: user.name,
  email: user.email,
})
const usersMapper = (users: UserApiType[]): UserType[] => users.map(userMapper)
export const userApiTransform: UserApiTransformType = ({ user }) => userMapper(user)
export const usersApiTransform: UsersApiTransformType = ({ users }) => usersMapper(users)
