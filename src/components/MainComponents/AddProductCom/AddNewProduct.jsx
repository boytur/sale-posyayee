import { BiBarcodeReader } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { config } from "../../../../config";

const AddNewProduct = () => {
  const [isPreviewImg, setIsPreviewImg] = useState(
    "https://placehold.co/600x400/EEE/31343C"
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    volume: "",
    barcode: "",
    file: null,
  });
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file,
    });

    // Preview รูป
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIsPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.barcode && formData.barcode.length !== 13) {
      Swal.fire({
        icon: "error",
        title: "บาร์โค้ดต้องมีความยาว 13 ตัว",
      });
      return;
    }

    if (!formData.name || !formData.price) {
      Swal.fire({
        icon: "error",
        title: "กรุณาใส่ชื่อและราคาสินค้า",
      });
      return;
    }

    if (formData.price <= 0) {
      Swal.fire({
        icon: "error",
        title: "ใส่ราคาให้ถูกต้อง",
      });
      return;
    }

    const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append("name", formData.name);
      formDataForUpload.append("price", formData.price);
      formDataForUpload.append("volume", formData.volume);
      formDataForUpload.append("barcode", formData.barcode);
      formDataForUpload.append("file", formData.file);

      const response = await axios.post(
        `${API_KEY}/add-product`,
        formDataForUpload,config
      );

      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 3000,
      });

      setFormData({
        name: "",
        price: "",
        volume: "",
        barcode: "",
        file: null,
      });

      setIsPreviewImg("https://placehold.co/600x400/EEE/31343C");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.error,
        timer: 5000,
      });

      console.error(error);
    }
  };

  useEffect(() => {
    document.title = "POSYAYEE 📦 เพิ่มสินค้าใหม่";
  }, []);

  return (
    <div className="w-full pl-3 flex bg-white h-full">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2 mt-4">
          <div className="w-full pl-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor=""
            >
              บาร์โค้ด
            </label>
            <div className="relative flex w-full">
              <input
                autoComplete="off"
                autoFocus
                className="appearance-none block w-[98%] bg-white
                 text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] focus:border-gray-500 placeholder:text-[#D9D9D9]"
                id="grid-first-name"
                type="number"
                placeholder="กรุณายิงบาร์โค้ด"
                value={formData.barcode}
                onChange={(e) =>
                  setFormData({ ...formData, barcode: e.target.value })
                }
              />
              <BiBarcodeReader
                size={35}
                className="absolute right-4 mt-[6px] z-50"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-full px-3 mb-6 md:mb-0">
            <label
              className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor=""
            >
              ชื่อสินค้าใหม่
            </label>
            <input
              autoComplete="off"
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white focus:border-gray-500 placeholder:text-[#D9D9D9] "
              id="grid-first-name"
              type="text"
              placeholder="โค้ก 1.5 ml."
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="w-2/4 px-3 pt-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor="grid-last-name"
            >
              ราคา (บาท)
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white focus:border-gray-500 placeholder:text-[#D9D9D9] "
              type="number"
              placeholder="15"
              value={formData.price}
              required
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
          <div className="w-2/4 px-3 pt-2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor="grid-last-name"
            >
              จำนวน (ชิ้น)
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border 
              border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white focus:border-gray-500 placeholder:text-[#D9D9D9]"
              id="grid-last-name"
              type="number"
              placeholder="20"
              value={formData.volume}
              onChange={(e) =>
                setFormData({ ...formData, volume: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
              htmlFor=""
            >
              รูปภาพ
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-[12rem] 
                border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  
                dark:hover:bg-bray-800 bg-[#e4e3ff1e] hover:bg-gray-100 
                dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-100"
              >
                {isPreviewImg == "https://placehold.co/600x400/EEE/31343C" ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        คลิ๊กเพื่ออัพโหลดรูปภาพ
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-[rem] h-[10rem]">
                    <img
                      src={isPreviewImg}
                      alt="Preview"
                      className="w-full h-full  object-cover"
                    />
                  </div>
                )}
                <input
                  onChange={handleFileChange}
                  id="file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-10">
          <button
            type="submit"
            className="w-[10rem] cursor-pointer hover:scale-105 bg-[#4C49ED] text-white border h-[3.5rem] rounded-md hover:bg-[#4c49edc4]"
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
