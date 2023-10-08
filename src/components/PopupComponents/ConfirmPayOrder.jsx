import Modal from "react-modal";

Modal.setAppElement("#root");
// eslint-disable-next-line react/prop-types
function ConfirmPayOrder({ isComfirmModaOpen, closeConfirmModal ,confirmPayOrder}) {
  return (
    <>
      <Modal
        isOpen={isComfirmModaOpen}
        onRequestClose={closeConfirmModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "40rem",
            height: "25rem",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          },
        }}
      >
        <div className=" w-full h-full text-center">
          <div>
            <div className="text-[#4C49ED] font-bold text-[2rem]">
              <h2>ยืนยันการจ่ายเงิน</h2>
            </div>
            <hr />
            <div className="h-full flex justify-center">
              <div className="mt-[3rem] flex gap-4">
                <label className="h-[3rem] items-center flex">เงินสด :</label>
                <input
                  className="h-[3rem] border text-black p-3 placeholder:p-3"
                  type="number"
                  placeholder="ป้อนเงินรับมา"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="w-full  gap-6 flex justify-center mt-[8rem]">
            <div>
              <button
                onClick={confirmPayOrder}
                className="w-[17rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
              >
                ยืนยัน
              </button>
            </div>
            <div>
              <button
                onClick={closeConfirmModal}
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

export default ConfirmPayOrder;
