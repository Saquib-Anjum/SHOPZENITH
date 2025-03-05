import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { currency } from '../App'
const List = ({token}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")

      //console.log(response.data);
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  // remove product 
  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}})

      //console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      }
      else {
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }
  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/*   List Table */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-small">
          <b className="text-center">Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* -----product list  */}
        {list.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]  gap-2 items-center py-1 px-2 border item-center"
          >
            <div>
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-12 object-cover"
              />
            </div>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency} {item.price}
            </p>
            <p onClick={()=>removeProduct(item._id)} className="text right md:text-center text-lg cursor-pointer ">X</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
