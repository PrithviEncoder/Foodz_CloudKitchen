import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { faL } from '@fortawesome/free-solid-svg-icons'

const PlaceOrder = () => {

  const navigate = useNavigate()
  const [isDisabled, setIsDisabled] = useState(false)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const { getTotalCartAmount, token, food_list, cartItems, SERVER_URL, discount } = useContext(StoreContext)

  const onChangeHandler = (event) => {

    const name = event.target.name
    const value = event.target.value

    setData(data => { return { ...data, [name]: value } })

  }

  useEffect(() => {
    console.log(data);

  }, [data])

  const placeOrder = async (event) => {
    event.preventDefault()
    setIsDisabled(true)
    let orderItems = []

    food_list.map((item, index) => {
      if (cartItems[item._id] > 0) {
        // let itemInfo = item //directly mutate original
        let itemInfo = {...item}
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    console.log('order items:', orderItems)

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 40 - discount,
      discount: discount
    }


    axios.post(SERVER_URL + "/api/order/place",orderData, { headers: { token } })
      .then(response => {
        if (response.data.success) {
          const { session_url } = response.data
          window.location.replace(session_url)
        }
        else {
          alert("Order placement failed!")
          setIsDisabled(false)
        }
      })
      .catch(error => {
        setIsDisabled(false)
        console.log(error.response?.data?.message || "Error in place order")
      })

  }

  useEffect(() => {
    if (getTotalCartAmount() <= 0) {
      navigate('/cart')
    }

  }, [])


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} required placeholder='First name' />
          <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} required placeholder='Last name' />
        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={data.email} required placeholder='Email' />
        <input type="text" name="street" onChange={onChangeHandler} value={data.street} required placeholder='Street' />
        <div className="multi-fields">
          <input type="text" name="city" onChange={onChangeHandler} value={data.city} required placeholder='City' />
          <input type="text" name="state" onChange={onChangeHandler} value={data.state} required placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} required placeholder='Zip code' />
          <input type="text" name="country" onChange={onChangeHandler} value={data.country} required placeholder='Country' />
        </div>
        <input type="text" name="phone" onChange={onChangeHandler} value={data.phone} required placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-₹{discount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() ? 40 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() ? getTotalCartAmount() + 40 - discount : 0}</b>
            </div>
            <hr />
          </div>
          <button
            className='place-order-btn '
            type="submit"
            disabled={isDisabled}
          >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder