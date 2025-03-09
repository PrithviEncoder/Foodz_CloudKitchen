import React, { useContext,useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from 'axios'
import './Verify.css'

const Verify = () => {

    const [searchParams,setSerachParams]=useSearchParams()
    const success=searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const { SERVER_URL } = useContext(StoreContext)
    const navigate=useNavigate()
    
    const verifyPayment = async () => {
        
        const response =await axios.post(SERVER_URL+"/api/order/verify",{success,orderId})
        if (response.data.success) {
             navigate('/myorders')
        }
        else {
            navigate('/')
        }
    }

    //run this on page load so spinner is already there untill api is running
    useEffect(() => {
      verifyPayment()
    }, [])
    

  return (
      <div className='verify'>
          <div className="spinner"></div>
    </div>
  )
}

export default Verify