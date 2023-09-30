// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsFillDatabaseFill, BsDatabaseFillAdd } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import {CgLogOut} from "react-icons/cg";

function Aside() {
  const [activeButton, setActiveButton] = useState(""); // State สำหรับติดตามปุ่มที่ active
  console.log(activeButton);
  
  // ฟังก์ชันเมื่อคลิกปุ่ม
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="bg-white w-[20rem] h-[89vh]">
      <div className="p-3 h-full">
        {/*  */}
        <div className=" flex justify-start h-[6rem]">
          <Link to='/'
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${
              activeButton === "home"
                ? "bg-[#E4E3FF] text-[#4C49ED] rounded-lg"
                : ""
            }`}
            onClick={() => handleButtonClick("home")}
          >
            <GoHomeFill size={20} />
            <p>ขายของหน้าร้าน</p>
          </Link>
        </div>
        <div className="flex justify-start  h-[6rem]">
          <Link to = '/view-stock'
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${
              activeButton === "stock"
                ? "bg-[#E4E3FF] text-[#4C49ED]"
                : ""
            }`}
            onClick={() => handleButtonClick("stock")}
          >
            <BsFillDatabaseFill size={20} />
            <p>ดูสต็อกสินค้า</p>
          </Link>
        </div>
        <div className="flex justify-start h-[6rem]">
          <Link to='/add-product'
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${
              activeButton === "addStock"
                ? "bg-[#E4E3FF] text-[#4C49ED]"
                : ""
            }`}
            onClick={() => handleButtonClick("addStock")}
          >
            <BsDatabaseFillAdd size={20} />
            <p>เพิ่มสต็อกสินค้า</p>
          </Link>
        </div>
        <Link to='/analysis' className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${
              activeButton === "analytics"
                ? "bg-[#E4E3FF] text-[#4C49ED]"
                : ""
            }`}
            onClick={() => handleButtonClick("analytics")}
          >
            <IoMdAnalytics size={20} />
            <p>วิเคราะห์ยอดขาย</p>
          </button>
        </Link>
        {/*  */}
        <br /><br /><br /><br /><br /><br />
        <div className="flex h-[2rem] justify-center items-end">
          <button className="text-[#4C49ED] flex items-center gap-1">
            <CgLogOut size={20} />
            <p>ออกจากระบบ</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aside;
