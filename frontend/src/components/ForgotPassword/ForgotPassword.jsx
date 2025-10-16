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
  const timeOutSucc = useRef(null);
  const btnRef = useRef(null);

  const onChangeHandler = (event) => {
    setEmail(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    btnRef.current.disabled = true; // Disable button to prevent multiple submissions
    btnRef.current.classList.add('disabled-btn');
    
    axios.post(SERVER_URL + "/api/user/forgot", { email })
      .then((response) => {
        setSucc(response?.data?.message)
        timeOutSucc.current = setTimeout(() => { 
          setSucc("");
          setEmail("");
          btnRef.current.disabled = false; // Re-enable button after operation
          btnRef.current.classList.remove('disabled-btn');
          setShowForgotPopup(false);
        }, 2200);
      })
      .catch((error) => {

        setErr(error.response?.data?.message);
        btnRef.current.disabled = true;
        btnRef.current.classList.add('disabled-btn');

        timeOutErr.current=setTimeout(() => {
          setErr("");
          btnRef.current.disabled = false; // Re-enable button after operation
          btnRef.current.classList.remove('disabled-btn');
        }, 2200);
        console.log(error.response?.data?.message || "Error in forgot email")
      })
  }

  // Clear timeout if component unmounts before it finishes
  useEffect(() => {
    return () => {
      clearTimeout(timeOutErr.current);
      clearTimeout(timeOutSucc.current);
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
        <button type="submit" ref={btnRef} className="submit-btn">
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