import React, { useState } from 'react'
import { menu_list } from '../../assets/assets.js'
import './Category.css'

const Category = ({currentCategory,setCurrentCategory}) => {

   
    return (
        <div id="category" >
            <h2 className="mt-8 md:mt-12 lg:mt-16 ml-10 text-xl sm:text-2xl lg:text-3xl font-semibold md:ml-24 lg:ml-32 xl:ml-48">Explore our menu</h2>
            <p className='text-[10px] sm:text-[12px] xl:text-sm ml-10 w-3/5 mt-3 md:ml-24 lg:ml-32 xl:ml-48 '>Explore a world of deliciousness! Browse our diverse menu, offering fresh, flavorful dishes that cater to every craving and satisfy every palate. Taste the best today!</p>
            <div className="category-items flex overflow-x-scroll ml-6 mr-6  mt-6 md:mt-8 md:m-auto md:w-4/5 md:justify-between lg:mt-8 lg:m-auto lg:w-4/5 lg:justify-between xl:w-4/5 xl:mt-8 xl:m-auto xl:justify-between">

                {menu_list.map((menu,index) => (
                    <div key={index} onClick={()=> setCurrentCategory(prev=>prev===menu.menu_name?"All":menu.menu_name)} className="category-item flex flex-col items-center ml-3 mr-3 ">
                        <div className={`${currentCategory===menu.menu_name?"active":""} category-image w-16 sm:w-20 md:w-24  xl:w-28  rounded-full overflow-hidden`}>
                              <img
                                src={menu.menu_image}
                                alt={menu.menu_name}
                                className="h-full w-full object-cover"/>
                        </div>
                        <p className='text-[9px] sm:text-[10px] md:text-[12px] lg:text-[13px] xl:text-[15px] '>{menu.menu_name}</p>
                    </div>
                ))}

            </div>
            <hr className='w-4/5 m-auto mt-4  h-[2px] bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 border-0 rounded-full my-4'/>

        </div>
    )
}

export default Category