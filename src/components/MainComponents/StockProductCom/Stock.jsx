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
import { useEffect } from "react";
import Aside from "../../NavbarAndAsideCom/Aside";
import "../../../assets/css/StockLoadingSpinner.css";
import { useState } from "react";
import OutStockProducts from "./OutStockProducts";
import AllProducts from "./AllProducts";

function Stock() {
  const [stockProducts, setProducts] = useState([]); //เพื่อดึง Products มาใช้
  const [loading, setLoading] = useState(true);
  const [outStockProducts, setOutStockProducts] = useState([]);
  let [btnCheck, setBtnCheck] = useState(true);
  function onBtnClick() {
    setBtnCheck(!btnCheck);
  }

  /**** Fecth API สินค้าทั้งหมดในคลัง ***************
   *หลังจากนั้น filter เอาสินค้าใกล้จะหมดและส่งเป็น 
   *prob => outStockProducts , allProducts
   ********************************************/
   const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
  const fetchProducts = () => {
    fetch(`${API_KEY}/view-product`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        const filterProducts = data.products.filter((product) => {
          return product.volume !== null && product.volume < 5;
        });
        setOutStockProducts(filterProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div>
      <div className="flex w-full h-full">
        {/* Import Aside มาใช้ */}
        <Aside />
        <div className="w-[80%] flex flex-col pl-1 pt-4">
          <div className="w-full h-[4rem] text-[#4C49ED] text-[32px] font-semibold items-center flex pl-4 ">
            <div>
              <h1>สินค้าในสต็อก</h1>
            </div>
          </div>
          <div>
            <div className="flex gap-6 w-full bg-white pl-4 rounded-md h-[3rem] items-center justify-between">
              <div className="flex gap-6">
                <button
                  onClick={onBtnClick}
                  className={
                    btnCheck ? "text-[#4C49ED] underline" : "text-black"
                  }
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
              <div className=" pr-10">
                <p>สินค้าในคลังทั้งหมด: {stockProducts.length} ชนิด</p>
              </div>
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
          {btnCheck ? (
            <OutStockProducts
              outStockProducts={outStockProducts}
              fetchProducts={fetchProducts}
              loading={loading}
            />
          ) : (
            <AllProducts
              allProducts={stockProducts}
              fetchProducts={fetchProducts}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Stock;
