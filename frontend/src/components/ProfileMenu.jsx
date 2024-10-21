import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProfileMenu = (props) => {
  const navigate = useNavigate()
  return (
    <div className="group relative">
            <img
              src={props.imgIcon}
              className=" w-7 cursor-pointer"
              alt="profile image"
            />
            <div className=" group-hover:block hidden absolute dropdown-menu right-1/2 pt-0">
              <div className="flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded-md">
                <p className="cursor-pointer  text-center hover:text-black">
                  My profile
                </p>
                
                <p className="cursor-pointer text-center hover:text-black">
                  Orders
                </p>
                <Link to='/logout'>
                <p className="cursor-pointer text-center hover:text-black">
                  Logout
                </p></Link>
              </div>
            </div>
          </div>
  )
}

export default ProfileMenu