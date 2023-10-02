/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import {useEffect} from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Scan({ cart, setCart }) {
  // Ensure cart is an array before calling map
  let cartItems = Array.isArray(cart) ? cart : [];
  // คำนวณราคารวมใหม่ทุกครั้งที่มีการเพิ่มหรือลบสินค้า
  let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  function deleteProductCart(_id) {
    // ใช้ findIndex เพื่อหา index ของสินค้าที่ต้องการลบ
    const indexToDelete = cart.findIndex(item => item._id === _id);
  
    // ตรวจสอบว่าพบสินค้าที่ต้องการลบหรือไม่
    if (indexToDelete !== -1) {
      const deletedItem = cart[indexToDelete];
      const updatedItems = [...cart];
      updatedItems.splice(indexToDelete, 1); // ลบสินค้าออกจากอาเรย์
  
      // แสดงข้อความ toast โดยใช้ชื่อสินค้าที่ถูกลบ
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
      // อัปเดตตะกร้าสินค้า
      setCart(updatedItems);
    }
  }

  function cancelOrder() {
    setCart([]);
  }

  //เช็คว่ากดปุ่มอะไร
  const PayMoney = () => {
    // your logic here
    console.log('pressed Enter ✅');
  };
  useEffect(() => {
    const keyDownHandler = event => {
      console.log('User pressed: ', event.key);

      if (event.key === 'Enter') {
        event.preventDefault();

        // 👇️ your logic here
        PayMoney();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

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
                        {item.quantity} {/* Display quantity */}
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
            <p className="font-semibold">{totalPrice.toFixed(2)} </p>
            <p>&nbsp;฿</p>
          </div>
        </div>
        <div className="w-full gap-3 flex justify-between p-2">
          <button
            className="w-[304px] h-[80px]  bg-[#D6D6D6CC] rounded-md text-[#ff000077] hover:bg-[#d6d6d6]"
            onClick={() => cancelOrder()}
          >
            <p>ยกเลิกการขาย</p>
          </button>
          <button className="w-[304px] h-[80px]  bg-[#4C49ED] rounded-md text-[2.5rem] text-white hover:bg-[#4c49edc4]">
            <p>จ่าย</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scan;