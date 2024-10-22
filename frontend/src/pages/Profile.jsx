import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {

  const{user} = useContext(UserContext)
  return (
    <div>Profile</div>
  )
}

export default Profile