// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Aside from "../../NavbarAndAsideCom/Aside";
import Scan from "./Scan";
import Navbar from "../../NavbarAndAsideCom/Navbar";
import LoadingSpinner from "../../LoaddingComponents/LoadingSpinner";

function Sale() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5500/view-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false on error as well
      });
  }, []);
  // กรองรายการสินค้าที่ barcode เป็น null
  const filteredProducts = products.filter(
    (product) => product.barcode === null
  );

  return (
    <div className="">
      <div className="">
        {/* Import Navbar มาใช้ */}
        <Navbar />
      </div>
      <div className="flex h-[90vh]">
        {/* Import Aside มาใช้ */}
        <Aside />
        <div className="w-[40%] flex bg-white flex-wrap justify-center full overflow-y-scroll gap-1">
          {/* ถ้ายัง fetch api ให้ดึงหน้า โหลดมาใช้ */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            //ถ้า fecth api เสร็จให้แสดงสินค้า
            filteredProducts.map((product) => (
              <div key={product._id} className="w-[160px]">
                <div className="border h-[200px] flex flex-col rounded-md bg-white cursor-pointer hover:border-[3px] hover:border-[#0085FF]">
                  <img
                    className="h-[8rem] object-cover"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="text-center pt-3 overflow-hidden h-[2.1rem]">
                    <p>{product.name}</p>
                  </div>
                  <div className="font-bold text-[#4C49ED] pl-2">
                    <h1>{product.price.toFixed(2)} ฿</h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <Scan />
      </div>
    </div>
  );
}

export default Sale;
