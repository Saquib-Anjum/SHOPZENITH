import React,{useContext} from 'react'
import {Link}  from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
const ProductItem = ({id,name,image,price}) => {

 const {currency} = useContext(ShopContext);   
  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img src={image[0]} alt="" className='hover:scale-110 transition ease-in-out' />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p>{currency}{price}</p>
        <p></p>
    </Link>
  )
}

export default ProductItem
