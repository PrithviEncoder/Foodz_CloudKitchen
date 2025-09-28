import React, { useContext ,useEffect} from 'react'
import { StoreContext } from '../../ContextApi/StoreContext.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import './Cart.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Cart = () => {

  const { food_list, cartItems, addToCart, removeFromCart, getTotalCartAmount, SERVER_URL, coupon, discount, setDiscount,fetchCoupon } = useContext(StoreContext);

  const [code, setCode] = useState("")

  const handleSubmit = () => {
    if (code === coupon.name && getTotalCartAmount() > coupon.condition) {
      if (coupon.type === 'percentage') {
        setDiscount((getTotalCartAmount() * coupon.value) / 100)
      }
      else {
        setDiscount(coupon.value)
      }
    }
    setCode("")
  }

  //very imp on changing cart after applying discount discount should be 0 .
  useEffect(() => {
    setDiscount(0)
    fetchCoupon()
  }, [cartItems])


  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Update</p>
        </div>
        <br />
        <hr />


        {//since object may be empty but it has key it is not falsy
          Object.values(cartItems).every(value => value === 0) ?
            <div className="empty-cart flex flex-col items-center gap-4">
              <img className='w-40' src='/empty.png' alt='empty cart'></img>
              <Link to='/'><div className="bg-gray-600 p-3 rounded-md text-white">Add Items</div></Link>
            </div> :
            ""}


        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <div className="update-items">
                    <button onClick={() => addToCart(item._id)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    {cartItems[item._id]}
                    <button onClick={() => removeFromCart(item._id)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className="cart-bottom">

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
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <div className="coupon">
              <p>{coupon.msg}</p>
              <p>CODE: {coupon.name}</p>
              <p>{coupon.value}{coupon.type === 'percentage' ? '%' : '₹'} OFF on Order Above ₹{coupon.condition}</p>
            </div>
            <div className="cart-promocode-input">
              <input type="text"
                placeholder='promo code'
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart