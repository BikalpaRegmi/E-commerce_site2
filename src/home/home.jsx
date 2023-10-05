import React, { useEffect, useState } from 'react';
import Item from '../item/item';
import { useSearchParams } from 'react-router-dom';
import FakestoreAPI from '../services/api';

const Home = () => {
  

 const [loading,setLoading] = useState(true);
 const [ products,setProducts] = useState([]);
 const [query,setQuery] = useSearchParams();
 const searchQuery = query.get('q');

 useEffect(()=>{
   try{
   const fetchProducts=async()=>{
    setLoading(true);
    const products = searchQuery ? await FakestoreAPI.fetchProductByQuery(searchQuery): await FakestoreAPI.fetchAllProduct(); 
    setProducts(products);
    setLoading(false);
  }
  fetchProducts();
}
  catch(error){
    console.log('the error is ',error)
  }
 },[searchQuery])
 
 if(!loading && searchQuery && !products.length){
  return (<>
   <p className='text-white text-4xl mt-24 ml-96'>Product didn't found matching your search </p>
   </>)
 }
  return (
    <div className='text-white'>
      {
        loading ? (
          <>
            <p>Loading...</p>
          </>
        ) : (
          products.map ((curval)=>{
            return (<Item key={curval.id} data={curval} addToCart={()=>{}}/>)
          })
        )
      }

    </div>
  )
}

export { Home}
