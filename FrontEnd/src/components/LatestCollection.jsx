import React ,{useState,useContext,useEffect} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProduct,setLatestProduct] = useState([])
    useEffect(()=>{
  setLatestProduct(products.slice(0,10))
    },[products])
    
   // console.log(products)
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECION"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
       {/* rendering product */}

       <div className='grid grid-cols-2 sm:grid-cols-3 md:gris-col-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProduct.map((item,idx)=>(
<ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price}/>

        ))}
        
       </div>
         
    </div>
  )
}

export default LatestCollection
