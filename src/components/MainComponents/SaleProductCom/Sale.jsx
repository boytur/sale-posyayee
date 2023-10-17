/*
  Sale.jsx เป็นหน้าหลักของการแสดงผล
  โดยตัวมันเองจะแสดงสินค้าที่ไม่มีบาร์โค้ด (หน้าตรงกลาง)
  จะประกอบไปด้วยหน้าย่อย 3 หน้าคือ
  Scan.jsx คือหน้า scan สินค้าลงในตะกร้า
  Aside.jsx คือหน้า Navbar ด้านซ้าย
  Navbar.jsx คือ Navbar ด้านบน 

  **เพิ่มเติม**
  -มีการส่ง props scan , setScan ไปใช้ บรรทัด 125
  -มีการเรียกใช้ LoadingSpinner.jsx เพื่อเป็นหน้าโหลดรอ fetch API
  -มีการเรียกใช้ Toastify ช่วยทำการแจ้งเตือน
  DATE : 30/กันยายน/2023
  OWNER : piyawat W.

*/

import { useState, useEffect } from "react";
import Scan from "./Scan";
import Aside from "../../NavbarAndAsideCom/Aside";
import Navbar from "../../NavbarAndAsideCom/Navbar";
import LoadingSpinner from "../../LoaddingComponents/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sale() {
  const [products, setProducts] = useState([]); //รอเก็บข้อมูลเข้า Array products
  const [isLoading, setIsLoading] = useState(true); //เช็คสถานะโหลด
  const [cart, setCart] = useState([]); //ตระกร้าสินค้าที่รอการชำระ

  // ฟังก์ชันเพิ่มสินค้าในตะกร้า
  function addProduct(product) {
    // ค้นหาว่าสินค้าที่ถูกส่งเข้ามาอยู่ในตะกร้าแล้วหรือไม่
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // ถ้าสินค้านี้มีอยู่ในตะกร้าแล้ว
      // ให้เพิ่มปริมาณสินค้าในตะกร้าเดิมของสินค้านี้
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // ถ้าสินค้านี้ยังไม่มีอยู่ในตะกร้า
      // ให้เพิ่มสินค้านี้เข้าไปในตะกร้าพร้อมปริมาณเป็น 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  useEffect(() => {
    // Fetch API สินค้าทั้งหมด
    fetch("http://localhost:5500/view-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false); // Set หน้าโหลดเป็นโหลดเสร็จ
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ฟิลเตอร์หาโปรดัคที่มีบาร์โค้ดเป็น null
  const filteredProducts = products.filter(
    (product) => product.barcode === null
  );

  return (
    <div>
      <div>
        {/* <div className="flex justify-center bg-[#000000d4] w-full absolute z-50 h-full items-center">
        </div> */}
        {/* Import Navbar มาใช้ */}
        <Navbar addProduct={addProduct} />
      </div>
      <div className="flex h-[90vh] relative">
        {/* การแจ้งเตือน */}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Import Aside มาใช้ */}
        <Aside />
        <div className="w-[40%] flex bg-white flex-wrap justify-center full overflow-y-scroll gap-1">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-3 gap-2 h-[27rem] w-[35rem] rounded-md">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border hover:border-[3px] hover:border-[#0085FF] cursor-pointer rounded-md"
                  onClick={() => addProduct(product)}
                >
                  <div className=" flex justify-center">
                    <img
                      className="h-[8rem] object-cover rounded-lg p-1" // เปลี่ยนความสูงที่นี่
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="text-left pl-2 pt-3 overflow-hidden h-[2.1rem] text-sm">
                    {product.name}
                  </div>
                  <div className="font-bold text-[#4C49ED] pl-2 text-[20px]">
                    {product.price.toFixed(2)} ฿
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* แสดงคอมโพนเนนต์ Scan และส่ง cart และ setCart เป็น props */}
        <Scan cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default Sale;
