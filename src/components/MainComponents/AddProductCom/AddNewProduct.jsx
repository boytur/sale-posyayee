import { BiBarcodeReader } from "react-icons/bi";
import axios from "axios";
import { useState ,useEffect} from "react";
import Swal from "sweetalert2";

function AddNewProduct() {
  const [isPreviewImg, setIsPreviewImg] = useState(
    "https://placehold.co/600x400/EEE/31343C"
  );
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    volume: "",
    barcode: "",
    image: "https://placehold.co/600x400/EEE/31343C",
  });

  function setImagePreview(URL) {
    setIsPreviewImg(URL);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // เพิ่มเงื่อนไขเช็คความยาวของบาร์โค้ด
    if (formData.barcode && formData.barcode.length !== 13) {
      Swal.fire({
        icon: "error",
        title: "บาร์โค้ดต้องมีความยาว 13 ตัว",
      });
      return;
    }
    // เพิ่มเงื่อนไขเช็คชื่อและราคา
    if (!formData.name || !formData.price) {
      Swal.fire({
        icon: "error",
        title: "กรุณาใส่ชื่อและราคาสินค้า",
      });
      return;
    }
    if (formData.price <= 0){
      Swal.fire({
        icon: "error",
        title: "ใส่ราคาให้มันถูกโว้ยยย!",
      });
      return;
    }

    
    try {
      const response = await axios.post(
        "http://localhost:5500/add-product",
        formData
      );
      console.log("สำเร็จ: ", response.data);
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
        image: "https://placehold.co/600x400/EEE/31343C",
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
  });
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
            <img src="" alt="" />
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
              URL รูปภาพ
            </label>
            <input
              autoComplete="off"
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImagePreview(e.target.value);
              }}
              className="appearance-none block w-full bg-white text-gray-700 
              border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] focus:bg-white placeholder:text-[#D9D9D9] focus:border-gray-500"
              id="grid-first-name"
              type="text"
              placeholder="https://placehold.co/600x400/EEE/31343C"
              value={formData.image}
            />
            <label className="flex tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
              รูปจะแสดงผลดังนี้
            </label>
            <img
              className="w-[170px] h-[100px] object-cover"
              src={isPreviewImg}
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
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
}

export default AddNewProduct;
