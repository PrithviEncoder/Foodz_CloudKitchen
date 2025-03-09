import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'

const ResetPassword = () => {
    const [pass,setPass]=useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [mess,setMess] = useState("")
    const { resetToken } = useParams()
    const {SERVER_URL} = useContext(StoreContext)

    const onSubmitHandler = (event) => {
        event.preventDefault()
        
        axios.post(`${SERVER_URL}/api/user/reset/${resetToken}`, { password: pass, confirmPassword: confirmPass })
            .then(((response) => {
               setMess(response?.data?.message)
            }))
            .catch((error) => {
            console.log(error.response?.data?.message||"Error in reset password");
        })
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
    <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
    <form onSubmit={onSubmitHandler}>
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 mb-3 border rounded-md"
        required
        onChange={(e)=>setPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 mb-3 border rounded-md"
        required
        onChange={(e)=>setConfirmPass(e.target.value)}
      />
         <p className='error'>{ mess }</p>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Reset Password
      </button>
    </form>
  </div>
</div>

  )
}

export default ResetPassword