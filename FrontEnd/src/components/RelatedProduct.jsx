import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import Product from '../pages/Product'

const RelatedProduct = ({category,subCategory}) => {

     const {products} = useContext(ShopContext);

     const [related,setRelated ] = useState('');

     useEffect(()=>{
if(products.length>0){
 let productsCopy = products.slice();
//  productsCopy=productsCopy.filter((item)=>category===item.category)

//  productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory);

productsCopy = productsCopy.filter(
  (item) => category === item.category && subCategory === item.subCategory
);

 setRelated(productsCopy);
 //console.log(productsCopy);
 console.log(category,subCategory)

}
     },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={"RELATED"} text2={"PRODUCT "}></Title>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        { related && related.map((item,idx)=>(<ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price}/>))}
      </div>
    </div>
  )
}

export default RelatedProduct
