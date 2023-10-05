import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Modal from "react-modal";

Modal.setAppElement("#root");

Scan.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCart: PropTypes.func.isRequired,
};

function Scan({ cart, setCart }) {
  let cartItems = Array.isArray(cart) ? cart : [];

  let totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  let totalPriceCommas = totalPrice.toLocaleString("en-US");

  function deleteProductCart(_id) {
    const indexToDelete = cart.findIndex((item) => item._id === _id);

    if (indexToDelete !== -1) {
      const deletedItem = cart[indexToDelete];
      const updatedItems = [...cart];
      updatedItems.splice(indexToDelete, 1);

      toast.error(`ลบ ${deletedItem.name}`, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setCart(updatedItems);
    }
  }

  const PayMoney = () => {
    openConfirmModal();
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();
        PayMoney();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  //ยกเลิกการขาย modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const confirmCancelOrder = () => {
    setCart([]);
    closeCancelModal();
    // ทำงานเมื่อผู้ใช้ยืนยันการยกเลิกการขาย
  };

  //ยืนยันการจ่ายตัง modal
  const [isComfirmModaOpen, SetComfirmModaOpen] = useState(false);
  const openConfirmModal = () => {
    SetComfirmModaOpen(true);
  };
  const closeConfirmModal = () => {
    SetComfirmModaOpen(false);
  };
  const confirmPayOrder = () => {
    setCart([]);
    closeConfirmModal();
  };

  return (
    <div className=" h-full w-[40%] flex justify-center">
      <div className="w-full flex flex-col">
        <div className=" bg-white pl-1">
          <table className="w-full text-center bg-[#D9D9D9] h-[3rem] rounded-md">
            <thead>
              <tr>
                <th
                  style={{
                    width: "20%",
                    paddingLeft: "10px",
                    textAlign: "left",
                  }}
                >
                  ชื่อสินค้า
                </th>
                <th style={{ width: "15%", borderLeft: "2px solid #ffff" }}>
                  ราคา
                </th>
                <th style={{ width: "5%", borderLeft: "2px solid #ffff" }}>
                  จำนวน
                </th>
                <th style={{ width: "10%", borderLeft: "2px solid #ffff" }}>
                  ลบ
                </th>
              </tr>
            </thead>
          </table>
          <div
            className="overflow-y-scroll w-full"
            style={{ height: "calc(100vh - 18.2rem)" }}
          >
            {cartItems.map((item, index) => (
              <div className="mt-3 bg-white pl-1" key={item._id}>
                <table
                  className={`w-full text-center h-[3rem] rounded-md ${
                    index % 2 !== 0 ? "bg-[#d9d9d91a]" : "bg-white"
                  }`}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "18%",
                          textAlign: "left",
                          fontWeight: "normal",
                        }}
                      >
                        <div className="flex gap-2 items-center overflow-hidden">
                          <img
                            src={item.image}
                            className="w-[40px] h-[40px] object-cover rounded-sm"
                            alt=""
                          />
                          {item.name}
                        </div>
                      </th>
                      <th
                        style={{
                          width: "15%",
                          fontWeight: "normal",
                          color: "#4C49ED",
                        }}
                      >
                        {item.price}
                      </th>
                      <th
                        style={{
                          width: "5%",
                          fontWeight: "normal",
                        }}
                      >
                        {item.quantity}
                      </th>
                      <th
                        style={{
                          width: "9%",
                          fontWeight: "normal",
                        }}
                      >
                        <div className="w-full justify-center flex pl-6 cursor-pointer ">
                          <AiFillDelete
                            size={20}
                            color="#f75d59"
                            className="hover:scale-125 transition"
                            onClick={() => deleteProductCart(item._id)}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="pl-3">
            <p>ราคารวม</p>
          </div>
          <div className="text-[2.5rem] text-[#4C49ED] pr-4 flex">
            <p className="font-semibold">{totalPriceCommas}</p>
            <p>&nbsp;฿</p>
          </div>
        </div>
        <div className="w-full gap-3 flex justify-between p-2">
          <button
            className="w-[304px] h-[80px]  bg-[#D6D6D6CC] rounded-md text-[#ff000077] hover:bg-[#d6d6d6]"
            onClick={openCancelModal}
          >
            <p>ยกเลิกการขาย</p>
          </button>
          <button
            className="w-[304px] h-[80px]  bg-[#4C49ED] rounded-md text-[2.5rem] text-white hover:bg-[#4c49edc4]"
            onClick={openConfirmModal}
          >
            <p>จ่าย</p>
          </button>
        </div>
      </div>

      {/* Modal ยืนยันการยกเลิกการขาย */}
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
      {/* Modal ยืนยันการจ่ายเงิน */}
      <Modal
        isOpen={isComfirmModaOpen}
        onRequestClose={closeConfirmModal}
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
    </div>
  );
}

export default Scan;
