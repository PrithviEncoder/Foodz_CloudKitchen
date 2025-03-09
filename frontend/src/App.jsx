import { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import { StoreContext } from './ContextApi/StoreContext.jsx'
import ProtectRoutes from './ProtectRoutes/ProtectRoutes.js'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword/ResetPassword.jsx'


function App() {
  const { showPopup,showForgotPopup } = useContext(StoreContext)

  return (
    <>

      {showPopup ? <LoginPopup /> : <></>}
      {showForgotPopup? <ForgotPassword/> : <></>}

      <div id="app">
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/cart' element={<ProtectRoutes><Cart /></ProtectRoutes>} />

          <Route path='/order' element={<ProtectRoutes><PlaceOrder /></ProtectRoutes>} />

          <Route path='/verify' element={<Verify />} />

          <Route path='/myorders' element={<MyOrders />} />

          <Route path='/reset-password/:resetToken' element={<ResetPassword/>} />
        </Routes>

        <Footer />
      </div>

    </>
  )
}


export default App
