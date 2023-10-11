/* eslint-disable react/prop-types */

import Modal from "react-modal";
Modal.setAppElement("#root");
function DeleteProduct({isDelelteModalOpen,closeDelelteModal,deleteConfirm}) {
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
          width: "40rem", // Set the width you desire
          height: "20rem", // Set the height you desire
          margin: "auto", // Center the modal horizontally
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px", // Rounded corners
        },
      }}
    >
      <div className="text-center transition-all">
        <h2 className="text-[#4C49ED] font-bold text-2xl">
          ยืนยันการลบสินค้า
        </h2>
        <div>
        <p className="text-[1rem] text-2xl mt-10">
          การดำเนินการนี้ไม่สามารถย้อนกลับได้คุณแน่ใจหรือไม่ ? 
        </p>
        </div>
      <div className="w-full gap-6 flex justify-center mt-[5rem]">
        <div>
          <button
            onClick={deleteConfirm}
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

export default DeleteProduct