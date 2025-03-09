import React, {useState, useContext,useRef,useEffect } from 'react'
import './Search.css' 
import { StoreContext } from '../../ContextApi/StoreContext.jsx'

const Search = () => {

const {setFilterItems,food_list}=useContext(StoreContext)
const [query, setQuery] = useState("");
const debounceRef = useRef(null); // Ref to store timeout ID

// Handle input change
const handleSearch = (event) => {
  const value = event.target.value.toLowerCase();
  setQuery(value);

  // Clear previous timeout
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }

  // Set a new timeout
  debounceRef.current = setTimeout(() => {
    const results = food_list.filter((food) =>
      food.name.toLowerCase().includes(value) ||
      food.category.toLowerCase().includes(value) ||
      (food.tags && food.tags.toLowerCase().includes(value))
    )
    setFilterItems(results)
  }, 1000); // 1000ms debounce delay
}

// Cleanup timeout when component unmounts
useEffect(() => {
  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };
}, []);



  return (
    <div className='search' id='search'>
      <p className='search-heading'>Search food here</p>
          <input type="text"
              className="search-bar"
        placeholder="Search for food..."
        onChange={handleSearch}
        value={query}
          />          
    </div>
  )
}

export default Search