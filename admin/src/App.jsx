import React, { useState,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import {assets} from './assets/assets'
import { ToastContainer, toast } from 'react-toastify';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency='$'
const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
  
  
  useEffect(()=>{
   localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
       <ToastContainer />
      {token === "" ? <Login setToken={setToken}/> : <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-[70%] mx-auto ml-5 md:ml-[5vw] my-8 text-gray-600 text-base">
            <Routes>
              <Route path='/add' element={<Add token={token}/>} />
              <Route path='/list' element={<List token={token}/>} />
              <Route path='/order' element={<Order token={token}/>} />
            </Routes>
          </div>
        {/* <img src={assets.Admin} alt=""  className='w-90'/> */}
        </div>
        
      </>      
      }
    </div>
  );
};

export default App;
