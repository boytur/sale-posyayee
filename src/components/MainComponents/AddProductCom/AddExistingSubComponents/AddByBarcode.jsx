/* eslint-disable react/prop-types */
import { BiBarcodeReader } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// eslint-disable-next-line no-unused-vars
function AddByBarcode({ products }) {
  const [scanProduct, setScanProduct] = useState([]);

  const scanBarcode = (value) => {
    console.log("Scanning barcode:", value);
    value = value.replace(" ", "");

    if (value.length >= 13) {
      let scannedProductsArray = [];

      for (let i = 0; i < value.length; i += 13) {
        const chunk = value.substring(i, i + 13);

        // กรองสินค้าที่ตรงกับแต่ละ chunk
        const filteredProducts = products.filter(
          (product) => product.barcode === chunk
        );

        // เพิ่ม filteredProducts เข้าไปใน scannedProductsArray
        scannedProductsArray = scannedProductsArray.concat(
          filteredProducts.map((product) => ({ ...product, quantity: 0 }))
        );
      }

      // ตั้งค่า state ด้วย scannedProductsArray ทั้งหมด
      setScanProduct(scannedProductsArray);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    setScanProduct((prevProducts) =>
      prevProducts.map((product, i) =>
        i === index ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // eslint-disable-next-line no-unused-vars
  const click = () => {
    console.log("Products add :", scanProduct);
  };

  const saveAddProductQuantity = async () => {
    const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
    try {
      const formData = {
        products: scanProduct.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
      };
      console.log(formData);
      const response = await axios.post(
        `${API_KEY}/add-product-quantity`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 3000,
      });
    } catch (err) {
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
  };

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-2 mt-3">
        <div className="w-full pl-3 mb-6 md:mb-0">
          <label
            className="block tracking-wide ml-1 text-gray-700 text-xs font-bold mb-2 text-left"
            htmlFor=""
          >
            บาร์โค้ด
          </label>
          <div className="relative flex">
            <input
              onChange={(e) => scanBarcode(e.target.value)}
              autoComplete="off"
              autoFocus
              className="appearance-none block w-full bg-white mr-2 text-gray-700 border rounded py-3 px-2 pl-12 mb-3 leading-tight focus:outline-[#4C49ED] focus:border-gray-500 placeholder:text-[#D9D9D9]"
              id="grid-first-name"
              type="text"
              placeholder="กรุณาสแกนหรือกรอกบาร์โค้ด"
            />
            <BiBarcodeReader
              color="#616161"
              size={32}
              className="absolute left-2 mt-[6px] top-[4.5%] z-50"
            />
             <button
             onClick={saveAddProductQuantity} 
             className="w-[8rem] border h-[2.9rem] flex justify-center items-center rounded-md bg-[#4C49ED] text-white font-light hover:scale-105 ">
              บันทึกข้อมูล
             </button>
          </div>
          <div>
            <div
              className="overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 19.5rem)" }}
            >
              {/* Map สินค้าที่มีบาร์โค้ด */}
              {scanProduct.map((p, index) => (
                <div
                  className=" w-full md:h-[6rem] border-b-2 bg-white rounded-md md:flex p-1 items-center"
                  key={p._id}
                >
                  <div className="md:w-[5rem] h-full srounded-md justify-center flex items-center">
                    <img
                      src={p.image}
                      className="w-[5rem] h-[5.2rem] object-cover rounded-md"
                      alt=""
                    />
                  </div>
                  <div className="md:w-[20rem] h-[95%] pl-2">
                    <div className=" font-semibold md:text-[1.5rem]">
                      <h1 className=" text-black truncate ...">{p.name}</h1>
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
                  <div className="w-[10rem] h-[95%] flex items-center justify-center gap-1">
                    <div className=" bg-[#E4E3FF] h-10 w-10 border hover:scale-105 hover:border-black/20 rounded-md">
                      <button
                        onClick={() =>
                          handleQuantityChange(index, p.quantity - 1)
                        }
                        className="text-black w-full h-full"
                      >
                        -
                      </button>
                    </div>
                    <div className="text-black text-[1.7rem] h-10 w-12  text-center rounded-md">
                      <input
                        value={p.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            index,
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-12 text-center"
                        type="number"
                      />
                    </div>
                    <div className="bg-[#E4E3FF] h-10 w-10 border hover:border-black/20 rounded-md hover:scale-105">
                      <button
                        onClick={() =>
                          handleQuantityChange(index, p.quantity + 1)
                        }
                        className="text-black w-full h-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddByBarcode;
