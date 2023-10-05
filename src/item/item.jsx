import React from 'react'
import {AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addInsideCart} from '../store/slices/cartSlice'
const Item = ({data,addToCart}) =>{
    const dispatch = useDispatch();
    const handleCart=(data)=>{
        dispatch(addInsideCart(data))
    }
    const {id,title,image,price} = data;
  return (
   <>
  
     
        <div className="image w-52 float-left ml-20  my-12 h-96 shadow-md shadow-white mt-3 rounded-xl">
               <img src={image} alt="" className='rounded-full h-52'/>   
        <div className="bottom w-[93%] ml-3">

            <div className="description text-white">
            <Link to={`product/${id}`}>
           <p className='text-sm mt-5 cursor-pointer hover:underline'> <i title='Details'>{title}</i></p>
            </Link>
            </div>

            <div className="price-and-cart flex justify-around">
                <p className='text-3xl cursor-pointer mt-3 hover:underline' title='price'> $ {price}</p>
                <AiOutlineShoppingCart className='mt-3 text-4xl cursor-pointer hover:bg-slate-700 rounded-xl p-1' title='add to cart' onClick={()=>handleCart(data)}/>
            </div>
                
        </div>
    </div>
 
   </>
  )
}

export default Item
