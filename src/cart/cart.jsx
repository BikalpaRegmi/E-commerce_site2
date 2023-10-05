import React, { useEffect } from 'react'

import { useSelector,useDispatch } from 'react-redux';
import {getCartTotal,removeCart,increaseItemQuantity,decreaseItemQuantity} from '../store/slices/cartSlice'
const Cart = () => {

  const {cart,totalQuantity,totalPrice} = useSelector((state)=>{
    return state.cart;
  });
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCartTotal());

  },[cart])
  return (
    <div>
      <div className="heading text-3xl text-center mt-3 font-bold">
        <p>Order Summary</p>
      </div>
     {cart.length >= 1 ? (
      cart.map((curval,index)=>{
      return(
        <>
     <div className="container border border-gray-700 p-5 flex gap-5 mt-5">
      <div className="left">
      <div className="pic w-52">
        <img src={curval.image} alt="" className='h-48 rounded-3xl ml-3'/>
      </div>
      </div>
      <div className="middle flex flex-col  w-52">
        <p className='text-md  h-36'>{curval.title}</p>
        <p className='hover:underline cursor-pointer pt-3 text-3xl text-green-500'> $ {curval.price * curval.quantity}</p>
      </div>
      <div className="right">
        <div className="counter flex justify-between w-40 text-3xl mt-9">
          <button className='border border-solid bg-green-900  rounded-md w-12' onClick={()=>dispatch(increaseItemQuantity(curval.id))}>+</button>
          <p>{curval.quantity}</p>
          <button className='border border-solid bg-green-900  rounded-md w-12' onClick={()=>dispatch(decreaseItemQuantity(curval.id))}>-</button>
        </div>
        <div className="remove text-center p-5">
          <button className='border text-3xl p-2 bg-green-900 rounded-3xl' onClick={()=>dispatch(removeCart(curval))}>Remove</button>
        </div>
      </div>
     </div>
     
     </>
     )})
      
     ) : (
      <div className=' text-5xl text-center w-96 h-14 shadow-green-700 shadow-2xl mt-20 ml-40 '> 
       <p >Cart is Empty</p>
      </div>
     )}
     <div className="container border border-gray-700 p-5 gap-5 mt-5">
     <p className='text-3xl text-center'>Payment Summary</p>
     <div className="infos">
      <p className='text-xl pt-7 pl-3 flex justify-around'>Subtotal Items <span>{totalQuantity}</span></p>
      <p className='text-xl pt-7 pl-3 flex justify-around pb-3'>Shipping fee { totalQuantity>0 ? (<span>$ 5</span>):(<span>$ 0</span>)}</p>
      <hr />
      <p className='text-xl pt-7 pl-3 flex justify-around'> Total <span> $ {totalQuantity>0 ? totalPrice + 5 : totalPrice}</span></p>
     </div>
     </div>
    </div>
  )
}

export  {Cart}
