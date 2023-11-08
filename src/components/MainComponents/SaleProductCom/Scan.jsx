import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Modal from "react-modal";
import CancelOrder from "../../PopupComponents/CancelOrder";
import ConfirmPayOrder from "../../PopupComponents/ConfirmPayOrder";
import Swal from "sweetalert2";

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

  //ยกเลิกการขาย modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const openCancelModal = () => {
    if (cartItems.length > 0) {
      setIsCancelModalOpen(true);
    }
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };

  const confirmCancelOrder = () => {
    setCart([]);
    closeCancelModal();
    Swal.fire({
      icon: "success",
      title: "ยกเลิกการขาย",
      timer:3000
    });
    // ทำงานเมื่อผู้ใช้ยืนยันการยกเลิกการขาย
  };

  //ยืนยันการจ่ายตัง modal
  const [isComfirmModalOpen, SetComfirmModalOpen] = useState(false);
  const openConfirmModal = () => {
    if (cartItems.length>0){
      SetComfirmModalOpen(true);
    }
  };
  const closeConfirmModal = () => {
    SetComfirmModalOpen(false);
  };
  const confirmPayOrder = () => {
    setCart([]);
    closeConfirmModal();
  };
  
  // Enter  เพื่อเปิด Modal การจ่ายเงิน
  // useEffect(() => {
  //   const keyDownHandler = (event) => {
  //     console.log("User pressed: ", event.key);
  //     if (event.key === "Enter") {
  //       PayMoney();
  //     }
  //   };
  //   document.addEventListener("keydown", keyDownHandler);
  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);
  
  return (
    <div className=" h-full w-[40%] flex justify-center">
      <div className="w-full flex flex-col pt-4">
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
            style={{ height: "calc(100vh - 13.8rem)" }}
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
            <p className="font-semibold">{totalPriceCommas}.00</p>
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
      <CancelOrder
        isCancelModalOpen={isCancelModalOpen}
        closeCancelModal={closeCancelModal}
        confirmCancelOrder={confirmCancelOrder}

      />
      {/* Modal ยืนยันการจ่ายเงิน */}
      <ConfirmPayOrder
        isComfirmModaOpen={isComfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        confirmPayOrder={confirmPayOrder}
        totalPrice = {totalPrice}
      />
    </div>
  );
}
export default Scan;
