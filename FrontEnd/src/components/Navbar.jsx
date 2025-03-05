import React, { useState ,useContext} from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router";
import {ShopContext} from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false);

const {search,setSearch ,showSearch,setShowSearch ,getCartCount,navigate,setToken ,token,setCartItems}  = useContext(ShopContext);

const logout = ()=>{
  localStorage.removeItem('token');
  setToken('');
  setCartItems({})
  navigate('/login')
}
  return (
    <div className="flex items-center justify-between py-4 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-40" alt="LOGO" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Link to='/collection'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className="w-5 cursor-pointer" /></Link>
        <div className="group relative">
          
          <img onClick={(e)=>token?null:navigate('/login')}
            src={assets.profile_icon}
            alt=""
            className="w-5 cursor-pointer"
          />
          {/* drop down */}
          {token && 
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate('/orders')}  className="cursor-pointer hover:text-black">Order</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <img  src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspact-squre rounded-full text-[8px]">
           {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          alt=""
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* side bar menu for small screen */}

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => {
              setVisible(false);
            }}
          >
            <img src={assets.dropdown_icon} alt="" className="h-4 rotate-180" />
            <p>Back</p>
          </div>
          <NavLink
            to="/"
            className="py-2 pl-6 border"
            onClick={() => {
              setVisible(false);
            }}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className="py-2 pl-6 border"
            onClick={() => {
              setVisible(false);
            }}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className="py-2 pl-6 border"
            onClick={() => {
              setVisible(false);
            }}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className="py-2 pl-6 border"
            onClick={() => {
              setVisible(false);
            }}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
