import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getCartTotal} from '../store/slices/cartSlice'
import { AiOutlineSearch,AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector,useDispatch } from 'react-redux';
const Navbar = ({onSearch}) => {
  const [searchQuery,setSearchQuery] = useState('');
  const {cart,totalQuantity} = useSelector((state)=> state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getCartTotal())
  },[cart])
  const handleSearch =()=>{
    if(searchQuery.trim().length){
      onSearch(searchQuery.trim());
    }
    setSearchQuery('')
  }
  useEffect(()=>{
   const handleEnter = (event) =>{
    if(event.code ==='Enter'){
      event.preventDefault()
      handleSearch();
    }
   }
   document.addEventListener('keydown',handleEnter)
   return ()=> document.removeEventListener('keydown',handleEnter)
  },[handleSearch])

  return (
  <>
 <div className="bg-lime-300 text-3xl h-12 flex justify-around text-black">
   <Link to = '/'>
    <div className="w-24 hover:cursor-pointer hover:shadow-xl">
    <img src="ecommerce.jpeg" alt="" className='w-36 h-12 rounded-xl' title='go to home page'/>
    </div></Link>
    <div className="searchbar flex bg-blue-100 text-lg">
   <input type="text" className=' focus:outline-none rounded-3xl p-3' placeholder='Search' value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)}/>
   
   <AiOutlineSearch className='text-4xl mt-2 hover:cursor-pointer' title='search' onClick={handleSearch}/>
  
    </div>
    <Link to='/cart'>
    <div className="cart flex rounded-3xl w-12 cursor-pointer hover:bg-orange-100 " title='go to cart'> 
    <AiOutlineShoppingCart className='text-4xl mt-1 ml-1'/>
    {totalQuantity>0  && <p className='text-xl text-gray-500'> {totalQuantity<9 ? totalQuantity : '9+'} </p>}
    </div>
    </Link>
 </div>
  </>
  )
}
export {Navbar};
