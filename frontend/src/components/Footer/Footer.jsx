import React from 'react'
import { assets } from '../../assets/assets.js'
import './Footer.css'

const Footer = () => {
  return (
      <div className='footer' id='footer'>
          <div className="footer-content">
              <div className="footer-content-left">
                  <img src='/logo.jpg' alt="logo" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos sunt, nobis molestiae porro recusandae tenetur sed voluptatibus voluptate voluptatum repudiandae nostrum molestias a, mollitia fuga animi dolorem tempora quo officia eveniet? Hic minima molestias itaque.</p>
                  <div className="footer-social-icons">
                      <img src={assets.facebook_icon} alt="" />
                      <img src={assets.twitter_icon} alt="" />
                      <img src={assets.linkedin_icon} alt="" />
                  </div>
              </div>
              <div className="footer-content-center">
                  <h2>COMPANY</h2>
                  <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                  </ul>

              </div>
              <div className="footer-content-right">
                  <h2>GET IN TOUCH</h2>
                   <ul>
                    <li>+91-919-456-8907</li>
                    <li>contact@tomato.com</li>
                   </ul>
              </div>
          </div>
          
          <hr />
          <p className="footer-copyright">Copyright 2025 © Tomato.com- All Right Reserved.</p>

    </div>
  )
}

export default Footer