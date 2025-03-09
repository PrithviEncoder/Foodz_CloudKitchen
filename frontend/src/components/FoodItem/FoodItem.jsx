import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { StoreContext } from '../../ContextApi/StoreContext.jsx'
import './FoodItem.css'

const FoodItem = ({ id, name, image, price, description }) => {

    const { cartItems, addToCart, removeFromCart,SERVER_URL } = useContext(StoreContext);


    return (
        <>
            <div className="food-item  border border-[#e2e2e2] rounded-t-lg">

                <div className="image-container rounded-t-lg relative overflow-hidden">

                    <img src={SERVER_URL+"/images/"+image} alt="food-item-image" className="food-item-image rounded-t-lg" />

                    {!cartItems[id] ? (<img src={assets.add_icon_white} className="absolute bottom-2 right-2 w-6" onClick={()=>addToCart(id)} />) : (<div className="update-item w-16 flex justify-between items-center absolute bottom-2 right-2 bg-white rounded-full pl-1 pr-1">
                        <img src={assets.add_icon_green} alt="" className="add-item w-5" onClick={()=>addToCart(id)} />
                        {cartItems[id]}
                        <img src={assets.remove_icon_red} alt="" className="remove-item w-5" onClick={()=>removeFromCart(id)}/>
                    </div>
                    )
                    }

                </div>

                <div className="food-item-info p-3">
                    <div className="food-item-detail flex justify-between items-center">
                        <p className="item-name">{name}</p>
                        <img className="item-rating w-10 h-2" src={assets.rating_stars} alt="ratings" />
                    </div>
                    <p className="item-desc text-[8px] mt-2">{description}</p>
                    <p className="item-price text-xl mt-2">₹{price}</p>
                </div>

            </div>
        </>
    )
}

export default FoodItem