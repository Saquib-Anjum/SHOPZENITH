import React,{useContext ,useState,useEffect} from 'react'
import {Link}  from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([])
    useEffect(()=>{
const bestProduct = products.filter((item)=>(item.bestseller));
setBestSeller(bestProduct.slice(0,5))
console.log("best seller",bestProduct)
    },[products])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={"BEST"} text2={"SELLIERS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
      {/* here I will show the component item with image title price */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:gris-col-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item,idx)=>(<ProductItem  key={idx} id={item._id} image={item.image} name={item.name} price={item.price}/>))}
      </div>
    </div>
  )
}

export default BestSeller
