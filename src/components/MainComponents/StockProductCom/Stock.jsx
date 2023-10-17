/*
  Stock.jsx เป็นหน้าหลักของการแสดงผล
  โดยตัวมันเองจะแสดงสินค้าในสต็อก
  จะประกอบไปด้วยหน้าย่อย 4 หน้าคือ
  OutStcokProduct.jsx คือหน้าแสดงสินค้าที่เหลือตํ่ากว่า 5 ชิ้น
  AllProduct.jsx คือหน้าแสดงสินค้าทั้งหมด
  Aside.jsx คือหน้า Navbar ด้านซ้าย
  Navbar.jsx คือ Navbar ด้านบน 

  **เพิ่มเติม**
  มีการเรียกใช้คอมโพเน้นท์ป๊อบอัพ 
  -EditProduct.jsx
  -DeleteProduct.jsx
  
  DATE : 17/ตุลาคม/2023
  OWNER : piyawat W.
*/

import Aside from "../../NavbarAndAsideCom/Aside";
import Navbar from "../../NavbarAndAsideCom/Navbar";
import "../../../assets/css/StockLoadingSpinner.css";
import { useState } from "react";
import OutStockProducts from "./OutStockProducts";
import AllProducts from "./AllProducts";

function Stock() {
  let [btnCheck, setBtnCheck] = useState(true);
  function onBtnClick() {
    setBtnCheck(!btnCheck);
  }

  return (
    <div>
      {/* Import Navbar มาใช้ */}
      <Navbar />
      <div className="flex w-full h-full">
        {/* Import Aside มาใช้ */}
        <Aside />
        <div className="w-[80%] flex flex-col pl-1">
          <div className="w-full h-[4rem] text-[#4C49ED] text-[32px] font-semibold items-center flex pl-4 ">
            <div>
              <h1>สินค้าในสต็อก</h1>
            </div>
          </div>
          <div>
            <div className="flex gap-6 w-full bg-white pl-4 rounded-md h-[3rem] items-center">
              <button
                onClick={onBtnClick}
                className={btnCheck ? "text-[#4C49ED] underline" : "text-black"}
              >
                <p>สินค้าใกล้จะหมด</p>
              </button>
              <button
                onClick={onBtnClick}
                className={
                  !btnCheck ? "text-[#4C49ED] underline" : "text-black"
                }
              >
                <p>สินค้าทั้งหมด</p>
              </button>
            </div>
          </div>
          <div className="mt-3  overflow-y-scroll pl-4">
            <table className="w-full text-center bg-[#D9D9D9] h-[3rem] rounded-md ">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "25%",
                      paddingLeft: "10px",
                      textAlign: "left",
                    }}
                  >
                    ชื่อสินค้า
                  </th>
                  <th style={{ width: "5%", borderLeft: "2px solid #ffff" }}>
                    ราคา
                  </th>
                  <th style={{ width: "10%", borderLeft: "2px solid #ffff" }}>
                    คงเหลือในสต็อก
                  </th>
                  <th style={{ width: "10%", borderLeft: "2px solid #ffff" }}>
                    วันที่เพิ่ม
                  </th>
                  <th style={{ width: "15%", borderLeft: "2px solid #ffff" }}>
                    รหัสบาร์โค้ด
                  </th>
                  <th style={{ width: "15%", borderLeft: "2px solid #ffff" }}>
                    แก้ไข / ลบ
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          {btnCheck ? <OutStockProducts /> : <AllProducts />}
        </div>
      </div>
    </div>
  );
}

export default Stock;
