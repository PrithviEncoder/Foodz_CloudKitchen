import React, { useContext, useState,useRef,useEffect } from 'react'
import './ForgotPassword.css'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from 'axios'


const ForgotPassword = () => {
  const [succ, setSucc] = useState("")
  const [err, setErr] = useState("")
  const [email, setEmail] = useState("")
  const { setShowForgotPopup, SERVER_URL } = useContext(StoreContext)
   // Use useRef for timeouts to persist them across renders
   const timeOutErr = useRef(null);

  const onChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    axios.post(SERVER_URL + "/api/user/forgot", { email })
      .then((response) => {
        setSucc(response?.data?.message)
      })
      .catch((error) => {
        setErr(error.response?.data?.message)
        timeOutErr.current=setTimeout(() => {
          setErr("")
        }, 2200);
        console.log(error.response?.data?.message || "Error in forgot email")
      })
  }

  // Clear timeout if component unmounts before it finishes
  useEffect(() => {
    return () => {
      clearTimeout(timeOutErr.current) 
    }
  }, []);

  return (
    <div className="forgot-password-container">
      <form onSubmit={onSubmitHandler} className="forgot-password-form">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          required
          onChange={onChangeHandler}
          value={email}
        />
        <button type="submit" className="submit-btn">
          Send Reset Link
        </button>
        <p onClick={() => setShowForgotPopup(false)} className='back'>back</p>
        <p className='success text-green-600'>{succ}</p>
        <p className='error text-red-700'>{err}</p>
      </form>
    </div>

  )
}

export default ForgotPassword