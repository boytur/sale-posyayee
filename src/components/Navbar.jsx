// eslint-disable-next-line no-unused-vars
import React from "react";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import userPic from '../assets/img/user.png';
let userName = 'Default'
function Navbar() {
  return (
    <div className="h-[4.5rem] flex justify-between bg-white">
      <Link to="/" className="flex items-center pl-8 gap-1 mt-5">
        <BsShop size={32} color="#4C49ED" />
        <h1 className="font-bold text-[2.7rem] pt-1">
          <span className="text-[#4C49ED]">POS</span>YAYEE
        </h1>
      </Link>
      <div>
        <div className="flex w-[15rem] p-1 items-center gap-4 justify-end">
          <div className="font-semibold flex"  >
          <h1>สวัสดี</h1> 
          <h1>, {userName}</h1>
          </div>
          <img src={userPic} className="w-[60px] h-[60]" alt="user" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
