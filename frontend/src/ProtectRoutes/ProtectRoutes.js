import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../ContextApi/StoreContext.jsx'

const ProtectiveRoutes = ({ children }) => {
  const navigate = useNavigate()
  const {setShowPopup}=useContext(StoreContext)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
      setShowPopup(true)
    }
  }, [navigate])
  
  return localStorage.getItem('token') ? children : null
}

export default ProtectiveRoutes
