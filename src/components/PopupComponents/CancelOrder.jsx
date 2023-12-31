// eslint-disable-next-line no-unused-vars
import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
function CancelOrder({
  // eslint-disable-next-line react/prop-types
  isCancelModalOpen,
  // eslint-disable-next-line react/prop-types
  closeCancelModal,
  // eslint-disable-next-line react/prop-types
  confirmCancelOrder,
}) {
  return (
    <>
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={closeCancelModal}
        contentLabel="ยืนยันการยกเลิก"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40rem", // Set the width you desire
            height: "25rem", // Set the height you desire
            margin: "auto", // Center the modal horizontally
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px", // Rounded corners
          },
        }}
      >
        <div className=" w-full h-full text-center">
          <div>
            <div className="text-[#4C49ED] font-bold text-[2rem]">
              <h2>ยืนยันการยกเลิกการขาย</h2>
            </div>
            <hr />
            <div className="h-full">
              <p className="mt-[5rem]">
                คุณแน่ใจหรือไม่ที่ต้องการยกเลิกการขาย?
              </p>
            </div>
          </div>
          <div className="w-full  gap-6 flex justify-center mt-[8rem]">
            <div>
              <button
                onClick={confirmCancelOrder}
                className="w-[17rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
              >
                ยืนยัน
              </button>
            </div>
            <div>
              <button
                onClick={closeCancelModal}
                className="w-[17rem]  border h-[4rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
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

export default CancelOrder;
