
/**
 * Mapper
 * **/
export const userMapper = (user: UserApiType): UserType => ({
    id: user._id,
    name: user.name,
    email: user.email,
})

export const usersMapper = (users: UserApiType[]): UserType[] => users.map(userMapper)
