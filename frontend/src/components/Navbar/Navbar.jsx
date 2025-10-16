import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets.js';
import { Menu, X, Search, Home, Smartphone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../ContextApi/StoreContext.jsx';
import './Navbar.css'
import LoginIcon from '../LoginIcon/LoginIcon.jsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbedSuitcase, faSearch } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const {disableComponent, getTotalCartAmount, token, setToken ,setShowPopup} = useContext(StoreContext);

  const toggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`navbar relative w-screen m-auto h-20 flex justify-between items-center lg:w-4/5 
    ${disableComponent ? 'hidden' : ''}
    `}>
      <Link to="/">
        <img src='/logo.jpg' alt="Logo" className="logo w-20 ml-5 sm:w-32 sm:ml-10 md:w-36 xl:w-40" />
      </Link>

      {screenWidth < 640 ? (
        <>
          {/* Hamburger Icon stays at its original position */}
          <button className="absolute left-32" onClick={toggle}>
            <Menu size={24} className="text-gray-600" />
          </button>

          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-[#2b4d73] text-white w-4/5 max-w-sm p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-3 right-4" onClick={toggle}>
                  <X size={28} className="text-white" />
                </button>

                <ul className="space-y-4 text-lg">
                  <li className="hover:bg-[#3a6186] p-2 rounded-md transition duration-200">
                    <Link to="/" className="flex items-center space-x-2" onClick={toggle}>
                      <Home size={20} />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="hover:bg-[#3a6186] p-2 rounded-md transition duration-200">
                    <a href="#category" className="flex items-center space-x-2" onClick={toggle}>
                      <Menu size={20} />
                      <span>Menu</span>
                    </a>
                  </li>
                  <li className="hover:bg-[#3a6186] p-2 rounded-md transition duration-200">
                    <a href="#app-download" className="flex items-center space-x-2" onClick={toggle}>
                      <Smartphone size={20} />
                      <span>Mobile App</span>
                    </a>
                  </li>
                  <li className="hover:bg-[#3a6186] p-2 rounded-md transition duration-200">
                    <a href="#footer" className="flex items-center space-x-2" onClick={toggle}>
                      <Mail size={20} />
                      <span>Contact Us</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      ) : (
        <ul className="navbar flex text-[#49557e] sm:text-sm sm:gap-3 md:text-lg md:gap-4 lg:gap-8 cursor-pointer">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#category">Menu</a>
          </li>
          <li>
            <a href="#app-download">Mobile-App</a>
          </li>
          <li>
            <a href="#footer">Contact-Us</a>
          </li>
        </ul>
      )}

      <div className={`${screenWidth < 640 && screenWidth > 500 ? 'mr-20 gap-10' : 'mr-4 gap-6'} navbar-right flex ${screenWidth <= 500 ? 'gap-2 mr-2' : ''}`}>
        <a href="#search">
        <FontAwesomeIcon  icon={faSearch} size='2x' className='text-gray-600'/>
        </a>
        <div className="basket relative">
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} size='2x' className='text-gray-600'/>
          </Link>
          <div className={getTotalCartAmount() === 0 ? 'dot' : 'w-2 h-2 rounded-full bg-red-500 absolute top-[-4px] right-[-2px]'}></div>
        </div>

        {!token?  <button className="sign-in" onClick={() => setShowPopup(true)}>
          Sign In
        </button> : <LoginIcon/>}
      
      </div>
    </div>
  );
};

export default Navbar;
