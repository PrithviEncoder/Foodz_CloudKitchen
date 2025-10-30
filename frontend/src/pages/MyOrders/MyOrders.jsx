import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import { toast } from 'react-toastify'
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

    //same as fetch orders but for tracking purpose
    const trackOrders = async (index) => {
        const response = await axios.get(SERVER_URL + "/api/order/userorders", { headers: { token } })
        const resData = response?.data?.orders;
        setData(resData)

        if (resData?.length > 0) {
        const res = [...resData];//becoz on reverse resData it also changes original array and data state.
        toast.info(`This order status: ${res?.reverse()[index]?.status}`)
        }

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
            {data.length === 0 ? (<img src="/no_order.jpg" alt="no-orders" className='no-orders-image' />) :
                (<div className="container">
                    {data.reverse().map((order, ind) => (
                        <div key={ind} className="my-orders-order">
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
                            <button onClick={() => trackOrders(ind)}>Track Order</button>
                        </div>
                    ))}
                </div>)
            }
        </div>
    )
}

export default MyOrders