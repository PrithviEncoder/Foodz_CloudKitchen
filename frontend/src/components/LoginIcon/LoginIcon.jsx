import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faRightFromBracket, faS, faShoppingBag, faT, faU, faV, faW, faX, faY, faZ } from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from '../../ContextApi/StoreContext.jsx';
import './LoginIcon.css'
import { Link, useNavigate } from 'react-router-dom';


const LoginIcon = () => {

    const { setToken, setCartItems } = useContext(StoreContext)
    const navigate = useNavigate()

    //logout
    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        localStorage.removeItem("userInfo")

        setCartItems({})//on logout show in frontend that cart is empty but data is there is backend
        //logout send to home page or blur background
        navigate('/')
    }

    const icons = {
        a: faA,
        b: faB,
        c: faC,
        d: faD,
        e: faE,
        f: faF,
        g: faG,
        h: faH,
        i: faI,
        j: faJ,
        k: faK,
        l: faL,
        m: faM,
        n: faN,
        o: faO,
        p: faP,
        q: faQ,
        r: faR,
        s: faS,
        t: faT,
        u: faU,
        v: faV,
        w: faW,
        x: faX,
        y: faY,
        z: faZ
    }

    const randomColors = [
        "#1E3A8A", // Dark Blue
        "#7C3AED", // Deep Purple
        "#DC2626", // Bright Red
        "#0D9488", // Teal
        "#D97706", // Deep Orange
        "#6D28D9", // Dark Violet
        "#2563EB", // Vivid Blue
        "#9333EA", // Rich Purple
        "#059669", // Dark Green
        "#B91C1C", // Crimson Red
        "#4B5563", // Charcoal Gray
        "#BE185D", // Deep Rose
        "#374151", // Dark Gray
        "#16A34A", // Emerald Green
        "#C2410C", // Burnt Orange
        "#4338CA", // Indigo
        "#B45309", // Dark Gold
        "#8B5CF6", // Soft Violet
        "#F59E0B", // Amber
        "#15803D"  // Forest Green
    ];

    //random index for color
    let colorIndex = Math.floor(Math.random() * randomColors.length)

    //extraction first char from email 
    const letter = localStorage.getItem("email").charAt(0)?.toLowerCase() || 'a'

    return (
        <div className="login-icon">

            <div className="login-icon-box" style={{ backgroundColor: randomColors[colorIndex] }} >

                <FontAwesomeIcon icon={icons[letter]} />

                <div className="login-icon-popup">
                    <ul>
                        <Link to='/myorders'>
                            <li>
                                <FontAwesomeIcon icon={faShoppingBag} className='text-gray-600' />
                                <p>Orders</p>
                            </li>
                        </Link>
                        <hr />
                        <li onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className='text-gray-600' />
                            <p>Logout</p>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

    )
}

export default LoginIcon