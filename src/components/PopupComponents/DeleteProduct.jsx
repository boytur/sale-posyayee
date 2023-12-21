/* eslint-disable react/no-unescaped-entities */
/*
  EditProducts.jsx เป็นหน้าย่อยของ Stock.jsx > OutStockProducts.jsx > รูปถังขยะ
  โดยตัวมันเองจะเป็น Modal เพื่อยินยันการลบสินค้าออกจาก Database

  DATE : 11/ตุลาคม/2023
  OWNER : piyawat W.

*/
/* eslint-disable react/prop-types */
import Modal from "react-modal";
Modal.setAppElement("#root");
import Swal from "sweetalert2";
import { config } from "../../../config";
import axios from "axios";

function DeleteProduct({
  isDelelteModalOpen,
  closeDelelteModal,
  name,
  _id,
  fetchProducts
}) {
  const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_KEY}/delete-product/${_id}`, config);
      const data = response.data;
        
      // Alert when deleting a product
      Swal.fire({
        icon: "success",
        title: `${data.message}`,
        timer: 3000,
      });
  
      // Fetch updated product list after deletion
      fetchProducts();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบข้อมูล", error);
  
      // Error alert
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการลบข้อมูล",
        text: "กรุณาลองอีกครั้ง",
      });
    }
  
    // Close the delete modal regardless of success or failure
    closeDelelteModal();
  };
  
  return (
    <>
      <Modal
        isOpen={isDelelteModalOpen}
        onRequestClose={closeDelelteModal}
        contentLabel="ยืนยันการยกเลิก"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40rem",
            height: "20rem",
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
          <h2 className="text-[#4C49ED] font-bold text-[2rem]">ยืนยันการลบ</h2>
          <div>
            <p className="text-[1.5rem] mt-10">ฉันต้องการจะลบ "{name}"</p>
          </div>
          <div className="w-full gap-6 flex justify-center mt-[5rem]">
            <div>
              <button
                onClick={handleDelete}
                className="w-[15.1rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
              >
                ยืนยัน
              </button>
            </div>
            <div>
              <button
                onClick={closeDelelteModal}
                className="w-[15.1rem] border h-[4rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteProduct;