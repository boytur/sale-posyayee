// eslint-disable-next-line no-unused-vars
import { useState ,useEffect} from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
Modal.setAppElement("#root");


function ConfirmPayOrder({
  // eslint-disable-next-line react/prop-types
  isComfirmModaOpen,
  // eslint-disable-next-line react/prop-types
  closeConfirmModal,
  // eslint-disable-next-line react/prop-types
  confirmPayOrder,
  // eslint-disable-next-line react/prop-types
  totalPrice,
}) {
  const [cashReceived, setCashReceived] = useState(); // สร้าง state เพื่อเก็บจำนวนเงินที่รับมา

  // ฟังก์ชันสำหรับการยืนยันการจ่ายเงิน
  const handleConfirmPayOrder = () => {
    // คำนวณจำนวนเงินที่เป็นค่าทอน
    const change = cashReceived - totalPrice;

    if (change >= 0 && totalPrice != 0) {
      // เรียกใช้ฟังก์ชันสำหรับยืนยันการจ่ายเงิน
      confirmPayOrder();
    } else if (totalPrice != 0){
      Swal.fire({
        icon: "error",
        title: "จำนวนเงินไม่เพียงพอ",
        timer:3000
      });
    }
    closeConfirmModal();
    setCashReceived();
  };

  const handleCancel = ()=>{
    setCashReceived();
    closeConfirmModal();
  }
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
        <form className=" w-full h-full text-center" onSubmit={handleConfirmPayOrder}>
          <div>
            <div className="text-[#4C49ED] font-bold text-[2rem]">
              <h2>ยืนยันการจ่ายเงิน</h2>
            </div>
            <hr />
            <div className="h-full flex pl-7 justify-center">
              <div className="mt-[3rem] flex gap-4 w-[20rem]">
                <label className="h-[3rem] items-center flex">เงินสด</label>
                <input
                  autoFocus
                  className="block w-fulltext-gray-700 border focus:outline-[#4C49ED] focus:border-none rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="ป้อนเงินรับมา"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(parseFloat(e.target.value))}
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex mt-10 pl-7 justify-center">
              <div className="w-[20rem] flex items-center">
                <p>เงินทอน &nbsp;</p>&nbsp;
                {isNaN(cashReceived - totalPrice) ||
                cashReceived - totalPrice < 0 ? (
                  <p className="text-[#4C49ED] text-[2rem]">เงินไม่เพียงพอ</p>
                ) : (
                  <p className=" text-[#4C49ED] text-[2rem] font-bold">
                    {(cashReceived - totalPrice).toLocaleString("en-US")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full  gap-6 flex justify-center mt-[3.6rem]">
            <div>
              <button
                onClick={handleConfirmPayOrder}
                className="w-[17rem] bg-[#4C49ED] text-white border h-[4rem] rounded-md hover:bg-[#4c49edc4]"
              >
                ยืนยัน
              </button>
            </div>
            <div>
              <button
                onClick={handleCancel}
                className="w-[17rem]  border h-[4rem] rounded-md text-[#ff000077] bg-[#D6D6D6CC] hover:bg-[#d6d6d6]"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ConfirmPayOrder;
