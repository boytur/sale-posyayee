/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { BiBarcodeReader } from "react-icons/bi";
import Swal from "sweetalert2";

function EditProduct({
  isEditModalOpen,
  closeEditModal,
  placeholder,
  _id,
  fetchProducts
}) {
  const [isPreviewImg, setIsPreviewImg] = useState(
    "https://placehold.co/600x400/EEE/31343C"
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);
  const [barcode, setBarcode] = useState("");


  //ส่งข้อมูลเข้าไปแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault(); //รีเซ็ตฟอร์ม
    //ถ้าบาร์โค้ดสั้นกว่า 13 หลัก
    if (barcode && barcode.length !== 13) {
      Swal.fire({
        icon: "error",
        title: "บาร์โค้ดต้องมีความยาว 13 ตัว",
      });
      return;
    }
    //ถ้าราคาที่ป้อนมาน้อยกว่าหรือเท่ากับ 0
    if (price <= 0){
      Swal.fire({
        icon: "error",
        title: "ใส่ราคาให้มันถูกโว้ยยย!",
      });
      return;
    }
    try {
      //เอาค่าใส่ฟอร์ม
      const formData = {
        name: name,
        price: price,
        volume: volume,
        barcode: barcode,
        image: isPreviewImg,
        _id: _id,
      };

      //เชื่อม API และเอาค่าในฟอร์มใส่ไปในบอดี้
      const response = await axios.post(
        "http://localhost:5500/edit-product",
        formData
      );
      //ถ้าสเตัสจาก server ปกติ
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `แก้ไขสินค้าสำเร็จ`,
        });
        closeEditModal();
        fetchProducts();
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการแก้ไขสินค้า:", JSON.stringify(error));
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการแก้ไขสินค้า",
      });
    }
  };

  const setImagePreview = (URL) => {
    setIsPreviewImg(URL);
  };

  return (
    <Modal
      isOpen={isEditModalOpen}
      onRequestClose={closeEditModal}
      contentLabel="ยืนยันการยกเลิก"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "40rem",
          height: "42rem",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        },
      }}
    >
      <div className="text-center transition-all">
        <h2 className="text-[#4C49ED] font-bold text-2xl">
          แก้ไขรายละเอียดสินค้า
        </h2>
        <br />
        <hr />
        <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                htmlFor=""
              >
                ชื่อสินค้าใหม่
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border
                  rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] focus:bg-white
                  focus:border-gray-500"
                id="grid-first-name"
                type="text"
                autoComplete="off"
                placeholder={placeholder}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-2/4 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                htmlFor="grid-last-name"
              >
                ราคา (บาท)
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border
                  border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white focus:border-gray-500
                  placeholder:text-[#D9D9D9]"
                id="grid-last-name"
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
                placeholder="15"
              />
            </div>
            <div className="w-2/4 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                htmlFor="grid-last-name"
              >
                จำนวน (ชิ้น)
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white
                   focus:border-gray-500 placeholder:text-[#D9D9D9]"
                onChange={(e) => setVolume(e.target.value)}
                id="grid-last-name"
                type="number"
                placeholder="20"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                htmlFor=""
              >
                URL รูปภาพ
              </label>
              <input
                autoComplete="off"
                onChange={(e) => setImagePreview(e.target.value)}
                className="appearance-none block w-full bg-white text-gray-700 border
                  rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] focus:bg-white placeholder:text-[#D9D9D9]
                  focus:border-gray-500"
                id="grid-first-name"
                type="text"
                placeholder="https://placehold.co/600x400/EEE/31343C"
              />
              <label className="flex tracking-wide text-gray-700 text-xs font-bold mb-2 text-left">
                รูปจะแสดงผลดังนี้
              </label>
              <img
                className=" w-[170px] h-[100px] object-cover"
                src={isPreviewImg}
                alt=""
              />
            </div>
          </div>
          <div className="w-full gap-6 flex justify-center mt-12">
            <div>
              <button
                onClick={closeEditModal}
                className="w-[15.1rem] border h-[4rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
              >
                ยกเลิก
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-[15.1rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProduct;