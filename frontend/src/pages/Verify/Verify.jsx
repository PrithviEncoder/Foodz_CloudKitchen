import React, { useContext,useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from 'axios'
import './Verify.css'

const Verify = () => {

    const [searchParams,setSerachParams]=useSearchParams()
    const success=searchParams.get("success")
    const session_id = searchParams.get("session_id")
    const { SERVER_URL } = useContext(StoreContext)
    const navigate=useNavigate()
    
    const verifyPayment = async () => {
        
      try {
          const response = await axios.post(SERVER_URL+"/api/order/verify",{success, session_id})
          if (response.data.success) {
               navigate('/myorders')
          }
          else {
              navigate('/')
          }
} catch (error) {
        console.log(error.message)
        console.error('Error in verifycomponent: ',error?.response?.data?.message);
        
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