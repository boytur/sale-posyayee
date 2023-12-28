// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsFillDatabaseFill, BsDatabaseFillAdd } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

let userName = "";
function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

  // กำหนดปุ่มที่เป็น "active" ตามเส้นทางปัจจุบัน
  const getActiveButton = (route) => {
    return location.pathname === route
      ? "bg-[#E4E3FF] text-[#4C49ED] rounded-sm border-r-4 border-[#4C49ED]"
      : "";
  };

  // ฟังก์ชันสำหรับการนำทางไปยังเส้นทางอื่น ๆ
  const handleNavigate = (route) => {
    navigate(route);
  };

  useEffect(() => {
    userName = sessionStorage.getItem("user");
    if (userName != null) {
      userName = userName.replace(/"/g, "");
    }
  });

  return (
    <div className="bg-white w-[12rem] hidden text-[#646771] h-[100vh] md:flex">
      <div className="w-full mt-3">
        <div
          className="flex items-center gap-1 w-full justify-center"
        >
          <h1 className="font-bold text-[2rem] text-black flex items-center p-1">
            <FaBars size={29} color="#4C49ED" className="mt-1"/>
            <Link to="/sale-products"><span className="text-[#4C49ED]">POS</span>YAYEE</Link>
          </h1>
        </div>
        <div className="flex justify-start h-[4rem] w-full mt-3">
          <button
            className={`flex gap-2 items-center text-[1rem] font-semibold w-full justify-start pl-4 ${getActiveButton(
              "/sale-products"
            )}`}
            onClick={() => handleNavigate("/sale-products")}
          >
            <GoHomeFill size={20} />
            <p>ขายของหน้าร้าน</p>
          </button>
        </div>
        <div className="flex justify-start h-[4rem] w-full">
          <button
            className={`flex gap-2 items-center text-[1rem] font-semibold w-full justify-start pl-4 rounded-lg ${getActiveButton(
              "/view-stock"
            )}`}
            onClick={() => handleNavigate("/view-stock")}
          >
            <BsFillDatabaseFill size={20} />
            <p>ดูสต็อกสินค้า</p>
          </button>
        </div>
        <div className=" flex justify-start h-[4rem]">
          <button
            className={`flex gap-2 items-center text-[1rem] font-semibold w-full justify-start pl-4 rounded-lg ${getActiveButton(
              "/add-product"
            )}`}
            onClick={() => handleNavigate("/add-product")}
          >
            <BsDatabaseFillAdd size={20} />
            <p>เพิ่มสต็อกสินค้า</p>
          </button>
        </div>
        <div className=" flex justify-start h-[4rem]">
          <button
            className={`flex gap-2 items-center text-[1rem] font-semibold w-full justify-start pl-4 rounded-lg ${getActiveButton(
              "/analysis"
            )}`}
            onClick={() => handleNavigate("/analysis")}
          >
            <IoMdAnalytics size={20} />
            <p>วิเคราะห์ยอดขาย</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aside;
