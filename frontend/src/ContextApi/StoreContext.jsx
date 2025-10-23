import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [showPopup, setShowPopup] = useState(false)

    const [showForgotPopup, setShowForgotPopup] = useState(false)

    const [showVerifyPopup, setShowVerifyPopup] = useState(false)
    
    const [cartItems, setCartItems] = useState({})

    const [food_list, setFood_list] = useState([])

    const [filterItems, setFilterItems] = useState([])

    const [coupon, setCoupon] = useState({})

    const [discount, setDiscount] = useState(0)

    const [disableComponent, setDisableComponent] = useState(false)

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    console.log("SERVER_URL",SERVER_URL);

    //OPTION 2 INSTEAD OF .ENV AND .ENV.PRODUCTION
    // const islocalhost = window.location.hostname === "localhost"
    // const SERVER_URL = !islocalhost ? "https://foodz-cloudkitchen.onrender.com/" : "http://localhost:8000"

    const [token, setToken] = useState("")

    const [isVerified, setIsVerified] = useState(null)


    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        //send food id and token for userid in backend
        if (token) {
            axios.post(SERVER_URL + "/api/cart/add", { itemId }, { headers: { token } })
                .then(response => {
                    console.log(response.data.message);
                })
                .catch(error => {
                    console.log(error.response?.data?.message || "error in addToCart")
                })
        }
        else {
            //if not login then login popup and all itemInCart.=0
            setShowPopup(true)
            setCartItems({})
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        //sending token and food id to backend
        if (token) {
            axios.post(SERVER_URL + "/api/cart/remove", { itemId }, { headers: { token } })
                .then(response => console.log(response.data.message))
                .catch(error => console.log(error.response?.data?.message || "Error in removeFromCart"))
        }
    }

    const loadCartData = (token) => {
        axios.get(SERVER_URL + "/api/cart/get", { headers: { token } })
            .then(response => {
                console.log("cart Item", response.data.cartData)
                setCartItems(response.data.cartData)
            })
            .catch(error => {
                console.log(error.response?.data?.message || "error in get cart items")
            })
    }

    const getTotalCartAmount = () => {
        let TotalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item)
                TotalAmount += itemInfo.price * cartItems[item]
            }
        }

        return TotalAmount;
    }

    const fetchFoodList = async () => {
        await axios.get(SERVER_URL + "/api/food/list")
            .then(response => {
                setFood_list(response.data.data)
                //not work as when data goes into food_list before it the below code will work . therefore food_list is empty so filterItems
                // setFilterItems(food_list)
                setFilterItems(response.data.data)
            })
            .catch(error => {
                console.log("Error in fetching food list", error.response?.data?.message);
            })
    }

    //api for promo code "coupon"
    const fetchCoupon = async () => {
        try {
            const res = await axios.get(SERVER_URL + "/api/coupon/applied")
            if (res.data.success) {
                setCoupon(res.data.data)
            }
        } catch (error) {
            console.log(error.res?.data?.message || "error in fetching coupon loc:frontend");
        }
    }

    const checkIsVerified = async () => {
        const res = await axios.post(SERVER_URL + "/api/user/info",{}, { headers: { token: localStorage.getItem("token") } });

        if (res?.data?.success) {
         setIsVerified(res?.data?.user?.isVerified);
        setShowVerifyPopup(!(res?.data?.user?.isVerified));
        //donot write setShowVerifyPopup(isVerified) since it take time to update state.
        console.log("Is Verified:", res?.data?.user?.isVerified);
        console.log("debug", res);
        }
        else {
            console.error("Error in verifying user:", res?.data?.message);
       }
        
        
    }

    useEffect(() => {
        if (token) {
            checkIsVerified();
        }
    }, [token])

    //to check in console for items in cart
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    //when page refresh it will run
    useEffect(() => {

        async function loadData() {
      
            await fetchFoodList()//load list on reload
            await fetchCoupon()//load coupon 
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                loadCartData(localStorage.getItem("token"))//load cart item if token
            }//stay login on reload
        }
        loadData()
    }, [])

    const contextValue = {
        showPopup,
        food_list,
        cartItems,
        SERVER_URL,
        token,
        showForgotPopup,
        filterItems,
        coupon,
        discount,
        showVerifyPopup,
        isVerified,
        disableComponent,
        setDisableComponent,
        setIsVerified,
        setShowVerifyPopup,
        fetchCoupon,
        setDiscount,
        setCoupon,
        setFilterItems,
        setShowForgotPopup,
        setShowPopup,
        setFood_list,
        setToken,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        loadCartData,
        checkIsVerified
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider