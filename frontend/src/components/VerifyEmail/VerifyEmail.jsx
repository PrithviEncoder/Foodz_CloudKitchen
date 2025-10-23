import React, { useContext, useRef, useState } from 'react'
import { StoreContext } from '../../ContextApi/StoreContext'
import axios from 'axios'
import './VerifyEmail.css'
import { faL } from '@fortawesome/free-solid-svg-icons'



const VerifyEmail = () => {

    const [otp, setOtp] = useState(new Array(6).fill(""))
    const inputsRef = useRef([])
    const [err,setErr] = useState("")

    const { SERVER_URL, setShowVerifyPopup, setToken, setIsVerified, isVerified } = useContext(StoreContext)

    const handleChange = (e, index) => {

        const value = e.target.value.replace(/\D/, "")
        if (!value) return;

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        //move to next input
        if (index < 5 && value) {
            inputsRef.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
            }
            if (index > 0 && otp[index]) {
                inputsRef.current[index - 1].focus()
            }
        }
    }

    const handleResendOtp = () => {
        axios.post(SERVER_URL + "/api/user/resend-verification", {}, {headers: {token:localStorage.getItem("token")}})
            .then(response => {
                if (response.data.success) {
                    alert("OTP resent successfully");
                }
            })
            .catch(error => {
                console.log(error, "Error in resending OTP");
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const otpString = otp.join("")
        if (otpString.length === 6) {
            axios.post(SERVER_URL + "/api/user/verify", { code: otpString })
                .then(response => {
                    if (response.data.success) {
                        setShowVerifyPopup(false)
                        setIsVerified(true)
                        
                        if (!localStorage.getItem("token")) {
                            localStorage.setItem("token", response.data.token)
                            localStorage.setItem("userInfo", JSON.stringify(response.data.user.name))
                            setToken(response.data.token)
                        }
                    }
                    else {
                        setErr(response?.data?.message ||"OTP is incorrect")
                        setTimeout(() => {
                            setErr("")
                        }, 2000);
                        //localStorage.removeItem("userInfo")
                        //localStorage.removeItem("token")
                        //setToken("")
                        // axios.post(SERVER_URL + "/api/user/remove",{email:localStorage.getItem("email")})
                    }
                })
                .catch(error => {
                    console.log(error, "Error in otp")
                })
        }
        else {
            alert("Please Enter all 6 digits")
        }

    }


    return (
        <div className='container-box'>
            <div className="box">

            <h2 className="verify-title">Verify Your Email</h2>
            <p className="verify-subtitle">Enter the 6-digit code sent to your email</p>

            <form onSubmit={handleSubmit} className="verify-form">
                <div className="otp-inputs">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="otp-input"
                        />
                    ))}
                    </div>
                    <div className="error mb-2 text-red-600">{err}</div>

                    <div className="resend-otp">
                        <p>Didn't receive the code?</p>
                        <button type="button" className='text-blue-600 my-2' onClick={handleResendOtp}>
                            Resend OTP
                        </button>
                    </div>

                <button type="submit" className="verify-button">
                    Verify
                </button>
            </form>

            </div>
        </div>
    )
}

export default VerifyEmail