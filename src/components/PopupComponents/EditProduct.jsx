/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { BiBarcodeReader } from "react-icons/bi";
import Swal from "sweetalert2";
import { config } from "../../../config";

function EditProduct({
  isEditModalOpen,
  closeEditModal,
  _id,
  placeholderName,
  placeholderPrice,
  placeholderVolume,
  placeholderImage,
  fetchProducts
}) {
  const [isPreviewImg, setIsPreviewImg] = useState("");
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

  //ส่งข้อมูลเข้าไปแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault(); //รีเซ็ตฟอร์ม
    //ถ้าบาร์โค้ดสั้นกว่า 13 หลัก
    if (formData.barcode && formData.barcode.length !== 13) {
      Swal.fire({
        icon: "error",
        title: "บาร์โค้ดต้องมีความยาว 13 ตัว",
      });
      return;
    }
    //ถ้าราคาที่ป้อนมาน้อยกว่าหรือเท่ากับ 0
    if (formData.price <= 0) {
      Swal.fire({
        icon: "error",
        title: "ใส่ราคาให้มันถูกโว้ยยย!",
      });
      return;
    }
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("name", formData.name);
      formDataUpload.append("price", formData.price);
      formDataUpload.append("volume", formData.volume);
      formDataUpload.append("barcode", formData.barcode);
      formDataUpload.append("file", formData.file);
      formDataUpload.append("_id", _id);

      const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
      console.log(formData);
      //เชื่อม API และเอาค่าในฟอร์มใส่ไปในบอดี้
      const response = await axios.post(
        `${API_KEY}/edit-product`,
        formDataUpload,config
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
                autoFocus
                id="grid-first-name"
                type="text"
                autoComplete="off"
                placeholder={placeholderName}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
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
                  border-gray-200 rounded py-3 px-2 leading-tight focus:outline-[#4C49ED] focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                type="number"
                required
                placeholder={placeholderPrice}
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
                   focus:border-gray-500"
                onChange={(e) =>
                  setFormData({ ...formData, volume: e.target.value })
                }
                id="grid-last-name"
                type="number"
                placeholder={placeholderVolume}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 mb-6 md:mb-0">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center w-full h-[12rem] 
                border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  
                dark:hover:bg-bray-800 bg-[#e4e3ff1e] hover:bg-gray-100 
                dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-100"
                >
                  {isPreviewImg == "" ? (
                    <div className="flex flex-col items-center justify-center pt-8 pb-6">
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
          <div className="w-full gap-6 flex justify-center mt-10">
            <div>
              <button
                onClick={() => {
                  closeEditModal();
                }}
                className="w-[15.6rem] border h-[4rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
              >
                ยกเลิก
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="w-[15.6rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
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
