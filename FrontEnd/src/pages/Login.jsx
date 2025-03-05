import React, { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const {token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Sign Up');
  
  // Form state
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        //console.log(response.data);
        if(response.data.success){
          localStorage.setItem("token",response.data.token) 
          toast.success("Account created successfully!");
        }
        else{
          toast.error(response.data.message);
        }
       
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if(response.data.success){
          setToken(response.data.token);

          localStorage.setItem('token', response.data.token);

          toast.success("Logged in successfully!");

          //navigate('/');
        }
        else{
          toast.error(response.data.message);
        }
        
        
       
        
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? null : (
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
      )}
      
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p className='cursor-pointer' onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}>
          {currentState === 'Login' ? 'Create account' : 'Login Here'}
        </p>
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
