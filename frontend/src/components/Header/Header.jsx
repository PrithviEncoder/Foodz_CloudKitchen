import React from 'react';
import './Header.css';

const Header = () => {
  let name = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div className="Header">
        <video
          className="Header-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/placeholder.jpg"  // Optional placeholder
        >
          <source src="/videos/food.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="Header-info-box">
          <h2 className='user-info'>{name ? "WELCOME " + name.toUpperCase() : ""}</h2>
          <h2 className='Heading'>Order food </h2>
          <p className='Quote'>Delight in every flavor, every moment.</p>
          <a href="#category">
            <button className='view-btn'>View Items</button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
