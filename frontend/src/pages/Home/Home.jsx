import React, { useState } from 'react'
import Header from '../../components/Header/Header.jsx'
import Category from '../../components/Category/Category.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx'
import './Home.css'
import Search from '../../components/Search/Search.jsx'
import ChatBot from '../../components/ChatBot/ChatBot.jsx'
import RecommendationSystem from '../../components/RecommendationSystem/RecommendationSystem.jsx'


const Home = () => {

  const [currentCategory, setCurrentCategory] = useState("All")
  const [cancel, setCancel] = useState(true)


  return (
    <div id='home'>
      <Header />
      <ChatBot cancel={cancel} setCancel={setCancel} />
      <div
        onClick={()=>setCancel(false)}
        className="chatbot-icon">
        💬
      </div>
      <RecommendationSystem/>
      <Category currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      <Search />
      <FoodDisplay currentCategory={currentCategory} />
      <AppDownload />
    </div>
  )
}

export default Home