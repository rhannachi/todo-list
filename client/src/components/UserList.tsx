import React from 'react'
import { UserType } from '../store/user'

type UserListProps = {
  userList: UserType[]
}

export const UserList: React.FC<UserListProps> = ({ userList }) => {
  return (
    <div className='container-user'>
      <ul>
        {userList.map(({ id, email }) => (
          <li key={id}> {email} </li>
        ))}
      </ul>
    </div>
  )
}
