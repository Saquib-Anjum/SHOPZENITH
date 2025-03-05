import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title'
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal'
const Cart = () => {
  const {products, currency, cartItem,updateQuantity,navigate} = useContext(ShopContext);
   const [cartData , setCartData] =useState([]);
   useEffect(()=>{
let tempData = [];
for(const items in cartItem){
  for(const item in cartItem[items]){
    if(cartItem[items][item]>0){
      tempData.push({
        _id:items,
        size:item,
        quatity:cartItem[items][item]
      })
    }
  }
}
setCartData(tempData)
   },[cartItem])
  
  return (
    <div className='border-t pt-14'>
     <div className='text-2xl mb-3'>
      <Title text1={"YOUR"} text2 ={"CART"}/>
     </div>
     <div className=''>
      {cartData.map((item,idx)=>{
        const productData = products.find((product)=>product._id===item._id);
        return(
        <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4' key={idx}>
          <div className='flex items-start gap-6'>
            <img src={productData.image[0]} alt=""  className='w-16 sm:w-20'/>
            <div className=''>
              <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
              <div className='flex items-center gap-5 mt-2'>
                <p>{currency}{productData.price}</p>
                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
              </div>
            </div>
          </div>
          <input onChange={(e)=>e.target.value==='' || e.target.value==='0' ?null :updateQuantity(item._id,item.size,Number(e.target.value))} type='number' min={1} defaultValue={item.quatity} className='border max-w-10 sm:mx-w-20 px-2 py-1'/>
          <img onClick={()=>{
            updateQuantity(item._id,item.size,0)
          }} src={assets.bin_icon} alt=""  className='w-4 cursor-pointer'/>
        </div>
      )
      })}
     </div>
    <div className='flex justify-endmy-20'>
      <div className='w-full sm:w-[450px'>
        <CartTotal/>
        <div className='w-full text-end '>
          <button onClick={()=>navigate('/place-order')}     
          className='bg-black text-white text-sm my my-8 px-8 py-3'>PROCEED TO CHECK OUT</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart
