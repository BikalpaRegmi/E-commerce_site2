import React from 'react';
import './App.css';
import {Navbar} from './components';
import { Product } from './product';
import { Cart } from './cart/cart';
import { Home } from './home/home';
import { Route,Routes,useNavigate,createSearchParams } from 'react-router-dom';
const App = () => {
   const navigate = useNavigate();
   
   const onSearch = (searchQuery) =>{
    navigate(`/?${createSearchParams({q:searchQuery})}`)
   }
   
  return (
    <>
      <Navbar onSearch={onSearch} cartItemCount={()=>{}}/>
      
   <Routes>
    <Route path='/' Component={Home}/>
    <Route path='/cart' Component={Cart}/>
    <Route path='/product/:productId' Component={Product}/>
   </Routes>
    </>
  )
}

export default App
