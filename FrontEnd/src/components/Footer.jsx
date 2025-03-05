import React from "react";
import { assets } from "../assets/assets.js";
const Footer = () => {
  return (
    <div className="">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            dicta vitae maxime amet neque non, ipsam nobis, accusantium placeat
            maiores voluptates voluptate repellat officiis expedita, ipsum
            voluptas modi iusto impedit?
          </p>
        </div>
        <div className="">
          <p className=" text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>ABOUT Us</li>
            <li>Delivery</li>
            <li>Privicy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-123-168-0976</li>
            <li>saquibanjumdeveloper@gmail.com</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-900" />
        <p className="mt-2 text-sm text-center">Made 💖 with <a href='https://github.com/Saquib-Anjum' className="text-gray-950">Saquib</a></p>
        <p className="mb-5 text-sm text-center">Copyright 2025 @shopzenith.com - All Right Reserved.</p>
        
      </div>
    </div>
  );
};

export default Footer;
