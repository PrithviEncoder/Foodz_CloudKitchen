import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../ContextApi/StoreContext.jsx'

const ProtectiveRoutes = ({ children }) => {
  const navigate = useNavigate()
  const {setShowPopup, isVerified}=useContext(StoreContext)

  useEffect(() => {

    if (!localStorage.getItem('token')) {
      navigate('/')
      setShowPopup(true)
    }

    if (localStorage.getItem('token') && isVerified === false) {
      navigate('/')
      alert("Please verify your email to access this page.")
    }
    
  }, [navigate])
  
  return (localStorage.getItem('token') && isVerified===true ) ? children : null
}

export default ProtectiveRoutes
