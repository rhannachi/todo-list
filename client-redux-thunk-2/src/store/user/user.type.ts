type UserApiType = {
  _id: string
  name: string
  email: string
}

type UserType = Pick<UserApiType, 'name' | 'email'> & {
  id: string
}