import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart:[],
    quantity:0,

}
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
     addInsideCart(state,action){
        const find = state.cart.findIndex(item=>action.payload.id === item.id)
        if(find>=0){
            state.cart[find].quantity += 1 ;
        }else{
            const tempVar = {...action.payload,quantity:1}
         state.cart.push(tempVar);
        }
     },

     getCartTotal:(state)=>{
        const {totalQuantity,totalPrice} = state.cart.reduce((cartTotal,cartItem)=>{
            const {price,quantity} = cartItem;
            const totalItem = price * quantity;
            cartTotal.totalPrice += totalItem;
            cartTotal.totalQuantity += quantity;
            return cartTotal;
        },
        {
        totalPrice:0,
        totalQuantity:0,
        }
        );
        state.totalPrice = parseFloat(totalPrice.toFixed(2));
        state.totalQuantity = totalQuantity;
     },
     removeCart : (state,action)=>{
        state.cart = state.cart.filter((item)=>item.id !== action.payload.id);
     },
     increaseItemQuantity: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      },
      decreaseItemQuantity: (state, action) => {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
    }
}
})
 export const {addInsideCart,increaseItemQuantity,decreaseItemQuantity,getCartTotal,removeCart} = cartSlice.actions;
export default cartSlice.reducer;