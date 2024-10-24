import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const OrderConfirm = () => {

  const{isLogin,user} = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <>
    {isLogin && user?(<div className='flex items-center justify-center'>
      <p className='text-2xl text-center'>your order successfully added you can track your order using by showing orders in your profile</p>
    </div>):<div className="text-center">
          <p className="text-2xl text-center text-blue-500">
            To Proceed to checkout page you must Login Or create User
          </p>
          <button
            className="w-44 h-10 text-white text-xl text-center font-semibold bg-green-500 hover:bg-yellow-500 focus:ring-yellow-300 rounded-xl mt-4 mx-auto"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>}
    </>
    
  )
}

export default OrderConfirm