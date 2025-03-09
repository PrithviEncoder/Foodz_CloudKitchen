import React, { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import Category from '../../components/Category/Category.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
import './Home.css'
import Search from '../../components/Search/Search.jsx'


const Home = () => {

  const [currentCategory, setCurrentCategory] = useState("All")

  return (
    <div>
      <Header />
      <section></section>
      <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <Search />
      <FoodDisplay currentCategory={currentCategory} />
      <AppDownload/>
      
    </div>
  )
}

export default Home