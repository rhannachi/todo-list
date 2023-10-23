type UserApiType = {
  _id: string
  name: string
  email: string
}
/* eslint-disable @typescript-eslint/no-unused-vars*/
type UserType = Pick<UserApiType, 'name' | 'email'> & {
  id: string
}
