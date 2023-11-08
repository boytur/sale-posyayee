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
import LoadingSpinner from "../../LoaddingComponents/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSearchAlt } from "react-icons/bi";
import { RiAddCircleFill } from "react-icons/ri";

function Sale() {
  const [products, setProducts] = useState([]); //รอเก็บข้อมูลเข้า Array products
  const [isLoading, setIsLoading] = useState(true); //เช็คสถานะโหลด
  const [cart, setCart] = useState([]); //ตระกร้าสินค้าที่รอการชำระ
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    (product) => product.barcode === null || product.barcode === ""
  );

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]); // ล้างผลลัพธ์ถ้าไม่มีคำค้นหา
    }
  }, [searchTerm, products]);

  return (
    <div>
      <div className="flex relative">
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
        <div className="w-[45%] ">
          {/* Search box */}
          <div className="w-full h-[5rem] flex justify-center items-center bg-white px-4">
            <div className="w-full  h-[50px] rounded-[16px] flex items-center relative">0
              <BiSearchAlt size={30} className="z-20 text-[#737791] pl-2" />
              <input
                type="text"
                name="find-products"
                placeholder="ค้นหาสินค้า..."
                className="bg-[#F9FAFB] text-[#737791] flex pl-10 w-full
                h-full absolute placeholder-style outline-none rounded-[10px] border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className = {
                searchResults!= 0 ? `absolute bg-white w-full z-50 cursor-pointer rounded-lg top-16 shadow-lg border`
                : ` absolute bg-white w-full z-50 cursor-pointer rounded-lg top-16 shadow-lg`
              }>
                <div className="">
                  {searchResults.slice(0,11).map((product, index) => (
                    <div
                      key={product._id}
                      className={
                        index % 2 === 0
                          ? `flex items-center bg-white rounded-md`
                          : `flex items-center bg-[#4545450f] rounded-md`
                      }
                    >
                      <div className=" w-[80px] p-2 h-[60px] flex items-center">
                        <img
                          className=" object-cover w-full h-full rounded-md"
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <div className="flex justify-between items-center w-full">
                        <div className="p-2">
                          <p>{product.name}</p>
                        </div>
                        <div className="pr-5 flex gap-1">
                          <RiAddCircleFill
                            color="#4C49ED"
                            size={25}
                            className="hover:scale-105"
                            onClick={() => addProduct(product)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex bg-white flex-wrap justify-center full overflow-y-scroll gap-1"
            style={{ height: "calc(100vh - 5rem)" }}
          >
            {/* ถ้ายังโหลดให้แสดงหน้าโหลด ถ้าไม่ ให้แสดงข้อมูล*/}
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              // map ข้อมูลจากสินค้าที่ไม่มีบาร์โค้ด
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-[150px]"
                  onClick={() => addProduct(product)}
                >
                  <div className="border mt-2 h-[200px] grid rounded-md bg-white cursor-pointer hover:border-[3px] 
                  hover:border-[#0085FF] shadow-md">
                    <img
                      className="h-[8rem] object-cover rounded-lg p-1 w-full"
                      src={product.image}
                      alt={product.name}
                    />
                    <div className="text-left pl-2 pt-3 overflow-hidden h-[2.1rem] text-sm">
                      <p>{product.name}</p>
                    </div>
                    <div className="font-bold text-[#4C49ED] pl-2 text-[20px]">
                      <h1>{product.price.toFixed(2)} ฿</h1>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* แสดงคอมโพนเนนต์ Scan และส่ง cart และ setCart เป็น props */}
        <Scan cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default Sale;
