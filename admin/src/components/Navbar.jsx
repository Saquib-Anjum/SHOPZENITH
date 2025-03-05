import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center py-2 px-[4x] justify-between m-1">
      <img className="w-[max(15%,130px)]" src = {assets.logo1} alt="Logo"/>
      <button onClick={()=>setToken("")} className ="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full">Logout</button>
    </div>
  )
}

export default Navbar
