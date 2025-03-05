import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currency } from '../App';
import { assets } from '../assets/assets';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      //console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.orders);
      }
      else {
        toast.error("Something went wrong")
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }
  }
  const statusHandler = async(e,orderId)=>{
try{
  const response = axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value},{headers:{token}});
  if(response.data.success){
   await fetchAllOrders()
  }
}catch(err){
  console.log(err);
  toast.error(err.message);
}
  }
  
  useEffect(() => {
    fetchAllOrders()
  }, [token])
  
  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-6">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, idx) => (
          <div key={idx} className="border-2 border-gray-200 rounded-lg p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              {/* Column 1: Image and Items */}
              <div className="flex flex-col space-y-2">
                <img className="w-12 h-12 mb-2" src={assets.parcel_icon} alt="Parcel" />
                <div className="text-xs sm:text-sm">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="py-1">
                      {item.name}
                      <span className="font-bold"> Quantity: </span> 
                      {item.Quantity} 
                      <span> {item.size}</span>
                      {idx !== order.items.length - 1 && ","}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Column 2: Customer Info */}
              <div className="text-xs sm:text-sm">
                <p className="font-semibold mb-1">{order.address.firstName + " " + order.address.lastName}</p>
                <p className="mb-1">{order.address.street}</p>
                <p className="mb-1">
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}
                </p>
                <p>{order.address.phone}</p>
              </div>
              
              {/* Column 3: Order Details */}
              <div className="text-xs sm:text-sm">
                <p className="mb-1">Items: {order.items.length}</p>
                <p className="mb-1">Method: {order.paymentMethod}</p>
                <p className="mb-1">Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              
              {/* Column 4: Amount */}
              <div className="text-sm sm:text-base font-medium">
                {currency}{order.amount}
              </div>
              
              {/* Column 5: Status Select */}
              <div>
                <select onChange={(e)=>statusHandler(e,order._id)} className="p-2 border border-gray-300 rounded w-full text-xs sm:text-sm font-semibold">
                  <option value="OrderPlaced">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order