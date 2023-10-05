const FakestoreAPI ={
    fetchAllProduct: async()=>{
     const response = await fetch ('https://fakestoreapi.com/products') ;
     return response.json();    
    },
   fetchProductById : async (productId)=>{
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
    return response.json();
   },
   fetchProductByQuery : async (query)=>{
    const response = await fetch(`https://fakestoreapi.com/products`)
    const result = await response.json();
    return result.filter((product)=>{
        return product.title.toLowerCase().includes(query);
    })
   }
}
export default FakestoreAPI;