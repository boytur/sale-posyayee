/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import CancelOrder from "../../PopupComponents/CancelOrder";
import ConfirmPayOrder from "../../PopupComponents/ConfirmPayOrder";
import Swal from "sweetalert2";
import axios from "axios";
import paySound from "../../../assets/Sounds/cash-register-purchase-87313.mp3";
import "../../../assets/css/LoadingWhilePayMoney.css";
import LoadingWhilePayMoney from "../../LoaddingComponents/LoadingWhilePayMoney";
import { config } from "../../../../config";

Modal.setAppElement("#root");

function Scan({ cart, setCart }) {
  const [loadingWhilePayMoney, setLoadingWhilePayMoney] = useState(false);
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
      timer: 3000,
    });
    // ทำงานเมื่อผู้ใช้ยืนยันการยกเลิกการขาย
  };

  //ยืนยันการจ่ายตัง modal
  const [isComfirmModalOpen, SetComfirmModalOpen] = useState(false);
  const openConfirmModal = (e) => {
    e.preventDefault();
    if (cartItems.length > 0) {
      SetComfirmModalOpen(true);
    }
  };
  const closeConfirmModal = () => {
    SetComfirmModalOpen(false);
  };

  const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
  
  //จ่ายด้วยเงินสดปกติ
  const confirmPayOrder = async () => {
    setLoadingWhilePayMoney(true);
    try {
      const formData = {
        products: cartItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
      };
      const response = await axios.post(`${API_KEY}/sale`, formData,config);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 3000,
      });

      setCart([]);
      closeConfirmModal();
      new Audio(paySound).play();
      setLoadingWhilePayMoney(false);
    } catch (err) {
      // การจัดการข้อผิดพลาดในการโทรองข้อมูลไปยังเซิร์ฟเวอร์
      console.log(err);
      if (err.response) {
        // กรณีเซิร์ฟเวอร์ส่งข้อมูลผิด
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          timer: 3000,
        });
      } else {
        // กรณีไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้
        setLoadingWhilePayMoney(false);
        Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
          timer: 3000,
        });
      }
    }
  };

  //จ่ายด้วยเครดิต
  const confirmPayWithCredit = async () => {
    setLoadingWhilePayMoney(true);
    try {
      const formData = {
        products: cartItems.map((item) => ({
          _id: item._id,
          quantity: item.quantity,
        })),
      };
      const response = await axios.post(`${API_KEY}/sale-credit`, formData,config);
      Swal.fire({
        icon: "success",
        title: response.data.message,
        timer: 3000,
      });

      setCart([]);
      closeConfirmModal();
      new Audio(paySound).play();
      setLoadingWhilePayMoney(false);
    } catch (err) {
      // การจัดการข้อผิดพลาดในการโทรองข้อมูลไปยังเซิร์ฟเวอร์
      console.log(err);
      if (err.response) {
        // กรณีเซิร์ฟเวอร์ส่งข้อมูลผิด
        Swal.fire({
          icon: "error",
          title: `${err.response.data.message}`,
          timer: 3000,
        });
      } else {
        // กรณีไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้
        setLoadingWhilePayMoney(false);
        Swal.fire({
          icon: "error",
          title: "ข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
          timer: 3000,
        });
      }
    }
  };

  const imgKey = import.meta.env.VITE_IMG_KEY;
  return (
    <div className=" h-full w-[40%] flex justify-center relative bg-white">
      {loadingWhilePayMoney ? <LoadingWhilePayMoney /> : " "}
      <div className="w-full flex flex-col pt-4 relative">
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
              <div className="bg-white pl-1 mt-1" key={item._id}>
                <table
                  className={`w-full text-center h-[3rem] rounded-md border-b ${
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
                            src={`${imgKey}${item.image}`}
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
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.price}
                      </th>
                      <th
                        style={{
                          width: "5%",
                          fontWeight: "normal",
                          fontSize: "25px",
                          fontWeight: "bold",
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
            onClick={(e) => openConfirmModal(e)}
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
        totalPrice={totalPrice}
        confirmPayWithCredit={confirmPayWithCredit}
      />
    </div>
  );
}
export default Scan;
