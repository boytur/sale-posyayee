/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { ImPriceTags } from "react-icons/im";
import { BsBoxSeam } from "react-icons/bs";
import axios from "axios";
import Swal from "sweetalert2";
import { config } from "../../../../../config";


// eslint-disable-next-line react/prop-types
function AddBySearch({ productsNobarcode }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsSearch, setProductsSearch] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = productsNobarcode.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]); // ล้างผลลัพธ์ถ้าไม่มีคำค้นหา
    }
  }, [searchTerm, productsNobarcode, productsSearch]);

  const addProductSearch = (_id) => {
    openModal();
    let productSearchArr = [];
    const filteredProducts = productsNobarcode.filter((product) => {
      return product._id === _id;
    });
    productSearchArr = productSearchArr.concat(
      filteredProducts.map((product) => ({ ...product, quantity: 0 }))
    );
    setProductsSearch(productSearchArr);
  };

  const updateQuantity = (e) => {
    const newQuantity = parseInt(e.target.value) || 0; // แปลงค่าเป็นจำนวนเต็มหรือ 0 ถ้าไม่สามารถแปลงได้
    setProductsSearch([{ ...productsSearch[0], quantity: newQuantity }]);
  };

  // eslint-disable-next-line no-unused-vars
  const click = () => {
    console.log("Products add :", productsSearch);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setProductsSearch([]);
  };
  const confirm = () => {
    saveAddProductQuantity();
    closeModal();
  };

  const saveAddProductQuantity = async () => {
    const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
    const formData = {
      products:[{
        _id:productsSearch[0]._id,
        quantity:productsSearch[0].quantity
      }]
    };
    try
    {
      const response = await axios.post(`${API_KEY}/add-product-quantity`, formData,config);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 3000,
      });
    }
    catch(err){
      // การจัดการข้อผิดพลาดในการโทรองข้อมูลไปยังเซิร์ฟเวอร์
      console.log(err);
      if (err.response) {
        // กรณีเซิร์ฟเวอร์ส่งข้อมูลผิด
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
          timer: 3000,
        });
      }
    }
  }
  return (
    // เพิ่มสินค้าด้วยการค้นหา
    <div className="flex flex-wrap -mx-3 mb-2 mt-3">
      <div className="w-full pl-3 mb-6 md:mb-0">
        <label
          className="block tracking-wide ml-1 text-gray-700 text-xs font-bold mb-2 text-left"
          htmlFor=""
        >
          ค้นหา
        </label>
        <div className="relative flex z-0">
          <input
            autoComplete="off"
            autoFocus
            className="appearance-none block w-full bg-white mr-2
               text-gray-700 border rounded-lg py-3 px-2 pl-10 pr-10 mb-3 leading-tight focus:outline-[#4C49ED] focus:border-gray-500 placeholder:text-[#D9D9D9]"
            id="grid-first-name"
            type="text"
            placeholder="ค้นหาสินค้า"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BsSearch
            color="#616161"
            size={20}
            className="absolute left-2 mt-[6px] top-[12%] z-50"
          />
        </div>
        <div>
          <div
            className="overflow-y-scroll"
            style={{ maxHeight: "calc(100vh - 19.5rem)" }}
          >
            {searchResults.map((p) => (
              <div
                className=" w-full md:h-[6rem] cursor-pointer hover:bg-black/5 border-b-2 bg-white rounded-md md:flex p-1 items-center"
                key={p._id}
                onClick={() => addProductSearch(p._id)}
              >
                <div className="md:w-[5rem] h-full srounded-md justify-center flex items-center">
                  <img
                    src={`${p.image}`}
                    className="w-[5rem] h-[5.2rem] object-cover rounded-md"
                    alt=""
                  />
                </div>
                <div className="md:w-[20rem] h-[95%] pl-2">
                  <div className=" font-semibold md:text-[1.5rem]">
                    <h1 className=" text-gray-700 truncate ...">{p.name}</h1>
                  </div>
                  <div className=" text-black/60 text-[11px]">
                    <h1>ราคา {p.price}.00 บาท</h1>
                  </div>
                  <div className="text-[1.1rem]">
                    คงเหลือ
                    <span className=" text-red-500 font-bold">
                      {" "}
                      {p.volume}{" "}
                    </span>
                    ชิ้น
                  </div>
                </div>
              </div>
            ))}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="ยืนยันการยกเลิก"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                  width: "25rem",
                  height: "35rem",
                  margin: "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                },
              }}
            >
              <div className=" w-full h-full">
                <div className="w-full  h-[14rem] text-black flex-col">
                  <div className=" w-full h-full bg-black rounded-md">
                    <img
                      className=" w-full h-full object-cover rounded-md border-none"
                      src={
                        productsSearch.length > 0 ? `${productsSearch[0].image}` : ""
                      }
                      alt=""
                    />
                  </div>
                  <br />
                  <div className="text-[2rem] text-center text-gray-700 w-full font-semibold ml-2">
                    <p className="truncate ...">
                      {productsSearch.length > 0 ? productsSearch[0].name : ""}
                    </p>
                  </div>
                  <div className=" text-[1rem] text-left text-gray-700 w-full ml-2 flex items-center gap-2 mt-3">
                    <ImPriceTags className="top-2" />
                    <p className="truncate ... ">
                      ราคา{" "}
                      <span className="font-bold">
                        {productsSearch.length > 0
                          ? productsSearch[0].price
                          : ""}{" "}
                      </span>
                      บาท
                    </p>
                  </div>
                  <div className="text-[1.5rem] text-left w-full ml-2 mt-2 flex items-center gap-2">
                    <BsBoxSeam size={25} color="#616161" />
                    <p className=" text-gray-700 truncate ... ">
                      คงเหลือ{" "}
                      <span className="text-red-500 font-bold">
                        {productsSearch.length > 0
                          ? productsSearch[0].volume
                          : ""}{" "}
                      </span>
                      ชิ้น
                    </p>
                  </div>
                  <div className="text-left w-full h-[4rem] py-2 px-2 rounded-md mt-2">
                    <input
                      className=" w-full h-full px-2 border rounded-md focus:outline-[#4C49ED]"
                      type="number"
                      autoFocus
                      placeholder="กรุณาระบุจำนวน"
                      onChange={(e) => updateQuantity(e)}
                    />
                  </div>
                  <div className="w-full gap-14 flex justify-center mt-4">
                    <div>
                      <button
                        onClick={closeModal}
                        className="w-[9rem] border h-[3.5rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
                      >
                        ยกเลิก
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={confirm}
                        type="submit"
                        className="w-[9rem] bg-[#4C49ED] text-white border h-[3.5rem] rounded-md hover:bg-[#4c49edc4]"
                      >
                        บันทึก
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBySearch;
