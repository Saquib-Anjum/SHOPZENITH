import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from "../context/ShopContext";
import Title from '../components/Title'
import { assets } from "../assets/assets";


const CartTotal = () => {
    const {products, currency, cartItem,updateQuantity ,getCartAmount,delivery_fee} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={"CART "} text2={"TOTALS"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}  {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
            <p>Shiping Fee</p>
            <p>{currency}  {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{getCartAmount()===0?0:getCartAmount()+delivery_fee}.00</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
