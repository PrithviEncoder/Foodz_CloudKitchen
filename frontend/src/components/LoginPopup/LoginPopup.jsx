import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { Link } from 'react-router-dom'
import './LoginPopup.css'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from "axios"

const LoginPopup = () => {
    const { SERVER_URL, setShowForgotPopup, setShowPopup, setToken, loadCartData, setShowVerifyPopup, isVerified } = useContext(StoreContext)
    const [localError, setLocalError] = useState("")
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setData((data) => ({ ...data, [name]: value }))
    }

    //console to see 
    useEffect(() => {
        console.log(data);
        localStorage.setItem("email", data.email)
    }, [data])

    //login or register
    const onLogin = async (event) => {

        event.preventDefault()
        let newUrl = SERVER_URL

        try {
            if (currState === "Login") {
                newUrl += "/api/user/login"
            }
            else {
                newUrl += "/api/user/register"
            }

            const response = await axios.post(newUrl, data)
            if (response.data.success) {
                if (currState !== "Login") {
                setShowVerifyPopup(true)
                }
                //userInfo username is stored in ls
                localStorage.setItem("userInfo", JSON.stringify(response.data.user.name))
                console.log("user info", response.data.user)
                //token 
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                setShowPopup(false)//hide popup after submit
                loadCartData(localStorage.getItem("token"))//on login reload cartitem

            }

        } catch (error) {
            console.error("Axios Error:", error.response?.data || error.message);

            setLocalError(error.response?.data?.message)
            setTimeout(() => {
                setLocalError("")
            }, 2000);
        }
    }


    return (
        <div className='login-popup'>

            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} alt="cross" onClick={() => setShowPopup(false)} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="password" required />
                </div>
                <p onClick={() => {
                    setShowForgotPopup(true)
                    setShowPopup(false)
                }} className='forgot-password'>Forgot password?</p>
                <p className='text-red-600 text-[14px]'>{localError}</p>
                <button type='submit'>
                    {currState === "Sign Up" ? "Create accout" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing , i agree to the terms of use &
                        <Link to='/privacy'><span className='text-blue-600'>privacy policy.</span></Link>
                    </p>
                </div>
                <div className="login-popup-links">
                    {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                        : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
                </div>
            </form>

        </div>
    )
}

export default LoginPopup