import React from 'react'
import './NotFound.css'

const NotFound = () => {
  return (
  <div class="notfound">
    <div class="emoji">🍕🥡</div>
    <h1>404</h1>
    <h2>Oops! This dish isn't on the menu...</h2>
    <p>The page you're looking for doesn't exist or has been taken off the burner.</p>
    <a href="/" class="btn">Back to Home</a>
  </div>  )
}

export default NotFound