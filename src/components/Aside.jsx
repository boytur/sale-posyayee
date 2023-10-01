// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsFillDatabaseFill, BsDatabaseFillAdd } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";

function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

   // กำหนดปุ่มที่เป็น "active" ตามเส้นทางปัจจุบัน
  const getActiveButton = (route) => {
    return location.pathname === route ? "bg-[#E4E3FF] text-[#4C49ED]" : "";
  };

  // ฟังก์ชันสำหรับการนำทางไปยังเส้นทางอื่น ๆ
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-white w-[20%] h-[89vh] text-[#646771]">
      <div className="p-3 h-full">
        <div className=" flex justify-start h-[6rem] mt-10">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/"
            )}`}
            onClick={() => handleNavigate("/")}
          >
            <GoHomeFill size={20} />
            <p>ขายของหน้าร้าน</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/view-stock"
            )}`}
            onClick={() => handleNavigate("/view-stock")}
          >
            <BsFillDatabaseFill size={20} />
            <p>ดูสต็อกสินค้า</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/add-product"
            )}`}
            onClick={() => handleNavigate("/add-product")}
          >
            <BsDatabaseFillAdd size={20} />
            <p>เพิ่มสต็อกสินค้า</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
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
