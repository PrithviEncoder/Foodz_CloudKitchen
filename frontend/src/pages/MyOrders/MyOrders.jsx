import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import axios from 'axios'
import './MyOrders.css'

const MyOrders = () => {

    const [data, setData] = useState([])
    const { SERVER_URL, token } = useContext(StoreContext)

    const fetchOrders = async () => {
        const response = await axios.get(SERVER_URL + "/api/order/userorders", { headers: { token } })

        setData(response.data.orders)
        console.log(response.data.orders)

    }
    useEffect(() => {
        //if user is auth then only show orders
        if (token) {
            fetchOrders()
        }
    }, [token])


    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src="/orderIcon.png" alt="order-icon" />
                        <p>
                            {order.items.map((item, index) => {
                                if (order.items.length - 1 === index) {
                                    return item.name + "x" + item.quantity
                                }
                                else {
                                    return item.name + "x" + item.quantity + ", "
                                }
                            })}
                        </p>
                        <p>₹{order.amount}.00</p>
                        <p>items: {order.items.length}</p>
                        <p><span> &#x25cf; </span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders