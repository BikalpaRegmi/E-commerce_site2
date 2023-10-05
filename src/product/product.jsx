import React, { useEffect, useState } from 'react'
import FakestoreAPI from '../services/api'
import { useDispatch } from 'react-redux';
import {addInsideCart} from '../store/slices/cartSlice'

import { Link,useParams } from 'react-router-dom';
import {AiOutlineShoppingCart } from "react-icons/ai";
const Product = () => {
  const [loading,setLoading] = useState(true);
  const [product,setProduct] = useState();
  const {productId} = useParams();
  const dispatch = useDispatch();

  const handleCart=(data)=>{
    dispatch(addInsideCart(data))
}
  useEffect(()=>{
    try{
      const fetchProduct = async()=>{
    setLoading (true);
    const product = await FakestoreAPI.fetchProductById(productId);
    setProduct(product);
    setLoading(false);
   }
   fetchProduct();
  }catch(err){
    console.log('the error is ' + err);
   }
  },[productId])

  if (!loading && !product){
    return (
    <>
    <p className='text-white text-xl'> product didn't found <Link to='/'>click here to visit home page</Link> </p>)
    </>
    )
  }
  return (
   <>
   {loading ? (
   <p>loading...</p>
   ):(
    <div className="container ml-5 mt-28 w-full flex  shadow-md shadow-white">
     <div className="left">
     <div className='w-52 h-60 flex items-center justify-center'>
  <img src={product.image} alt="" className='max-w-full max-h-full rounded-3xl object-contain' />
</div>
      </div>
 
      <div className="right ml-4 mt-11">
       <div className="des">
        <p>{product.description}</p>
       </div>
       <div className="price_cart mt-4 flex gap-x-36">
        <p className='text-3xl pt-3'> $ {product.price}</p>
        <AiOutlineShoppingCart className='text-6xl p-1 cursor-pointer hover:bg-slate-800 rounded-3xl' title='add to cart' onClick={()=>handleCart(product)}/>
       </div>
      </div>
    </div>
   )
   }
   </>
  )
}

export {Product}
