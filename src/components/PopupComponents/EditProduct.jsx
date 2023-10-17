/*
  EditProducts.jsx เป็นหน้าย่อยของ Stock.jsx > OutStockProducts.jsx > รูปปากกา
  โดยตัวมันเองจะเป็น Modal form เพื่อกรอกข้อมูลในการแก้ไขสินค้า

  DATE : 11/ตุลาคม/2023
  OWNER : piyawat W.

*/

import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import {BiBarcodeReader} from 'react-icons/bi'

// eslint-disable-next-line react/prop-types, no-unused-vars
function EditProduct({ isEditModalOpen, closeEditModal, confirmEdit,placeholder}) {
  
  //เซ็ตรูป Preview
  const [isPreviewImg , setIsPreviewImg] = useState('https://placehold.co/600x400/EEE/31343C')
  function setImagePreview (URL){
    setIsPreviewImg(URL)
    console.log(isPreviewImg);
  }

  return (
    <>
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
            height: "38rem",
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
          {/* --------------------------------------------------- */}
          <form className="w-full max-w-lg mt-4">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  ชื่อสินค้าใหม่
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder={placeholder}
                />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                  htmlFor="grid-last-name"
                >
                  ราคา (บาท)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="number"
                  placeholder="15"
                />
              </div>
            </div>
            {/* ---------------------------------------------------- */}
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  URL รูปภาพ
                </label>
                <input
                  onChange={(e) => setImagePreview(e.target.value)}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="https://placehold.co/600x400/EEE/31343C"
                />
                <label  className="flex tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                >รูปจะแสดงผลดังนี้</label>
                <img className=" w-[170px] h-[100px] object-cover" 
                src={isPreviewImg} alt="" />
              </div>
              <div className="w-full md:w-1/4 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  text-left"
                  htmlFor="grid-last-name"
                >
                  จำนวน (ชิ้น)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="number"
                  placeholder="20"
                />
              </div>
            </div>
            {/* ----------------------------------- */}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full  pl-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 text-left"
                  htmlFor=""
                >
                  บาร์โค้ด
                </label>
                <img src="" alt="" />
                <div className="relative flex w-full" >
                <input
                  className="appearance-none block w-[98%] bg-gray-200 text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="กดรูปบาร์โค้ดเพื่อสแกน"
                />
                <BiBarcodeReader size={30} className=" absolute right-5 mt-[8px] cursor-pointer hover:scale-110 z-50" />
                </div>
              </div>
            </div>

          </form>
            {/* --------------------------------- */}
        <div className="w-full gap-6 flex justify-center mt-4">
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
              onClick={confirmEdit}
              className="w-[15.1rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
            >
              ยืนยัน
            </button>
          </div>
        </div>
        </div>
      </Modal>
    </>
  );
}

export default EditProduct;
