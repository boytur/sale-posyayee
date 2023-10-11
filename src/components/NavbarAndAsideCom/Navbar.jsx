// eslint-disable-next-line no-unused-vars
import React from "react";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import userPic from "../../assets/img/user.png";
import { BiSearchAlt } from "react-icons/bi";

let userName = "sangjun";
function Navbar() {
  return (
    <div className="h-[4.5rem] flex justify-between bg-white w-full">
      <Link to="/" className="flex items-center pl-8 gap-1   w-[18.5%]">
        <BsShop size={32} color="#4C49ED" />
        <h1 className="font-bold text-[2.7rem] pt-1">
          <span className="text-[#4C49ED]">POS</span>YAYEE
        </h1>
      </Link>
      <div className="w-[50%]  flex justify-left p-1 text-[19px] items-center pl-5">
        <div className="w-[70%] h-[50px] bg-[#F9FAFB] rounded-[16px] flex items-center relative">
          <BiSearchAlt size={30} className=" z-20 text-[#737791] pl-2" />
          <input
            type="text"
            name="find-products"
            placeholder="ค้นหาสินค้า..."
            className="w-full bg-[#F9FAFB] text-[#737791] flex pl-10 h-full absolute placeholder-style outline-none rounded-[10px]"
          />
        </div>
      </div>
      <div className="w-[30%] pr-2">
        <div className="flex p-1 items-center gap-4 justify-end">
          <div className="font-semibold flex">
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
