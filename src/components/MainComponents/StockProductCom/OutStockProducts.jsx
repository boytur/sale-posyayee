/*
  OutStockProducts.jsx เป็นหน้าย่อยของ Stock.jsx
  โดยตัวมันเองจะแสดงสินค้าที่ใกล้จะหมด

  **เพิ่มเติม**
  -มีการส่ง props EditProduct ,DeleteProduct ไปใช้ บรรทัด 189
   เพื่อเขียนคอมโพเน้นต์แยกของหน้า Modal การแก้ไขสินค้า (รูปปากกา)
   และเพื่อเขียนคอมโพเน้นต์ลบสินค้า Modal การยืนยันลบสินค้า (รูปถังขยะ)

  DATE : 11/ตุลาคม/2023
  OWNER : piyawat W.

*/

import { useState, useEffect } from "react";
import "../../../assets/css/StockLoadingSpinner.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditProduct from "../../PopupComponents/EditProduct";
import DeleteProduct from "../../PopupComponents/DeleteProduct";

function OutStockProducts() {
  const [stockProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen,setIsEditModalOpen] = useState(false);
  const [isDelelteModalOpen,setDelelteModalOpen] = useState(false);

  /* Edit modal */
  //เก็บ _id ไปเช็คเพื่อแก้ไขข้อมูล
  function editClick (_id){
    setIsEditModalOpen(!isEditModalOpen)
    console.log(_id);
    console.log(isEditModalOpen);
    openEditModal();
  }

    const openEditModal = () => {
      setIsEditModalOpen(true);
    };
    const closeEditModal = () => {
      setIsEditModalOpen(false);
    };
    const confirmEdit = () => {
      closeEditModal();
    };


  /* Delete modal */
  // eslint-disable-next-line no-unused-vars
  function deleteClick(_id){
    setDelelteModalOpen(!isDelelteModalOpen)
    console.log(isDelelteModalOpen)
    console.log(_id)
    openDeleteModal();
  }

  const openDeleteModal = () => {
    setDelelteModalOpen(true);
  };
  const closeDelelteModal = () => {
    setDelelteModalOpen(false);
  };
  const deleteConfirm = () => {
    closeDelelteModal();
  };

  /* Fecth API  view-outstock-product */
  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5500/view-outstock-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); //ชื่อ collection
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      {loading ? (
        <div className=" flex justify-center mt-[10%]">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div
          className=" overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 16rem)" }}
        >
          {stockProducts.map((product, index) => (
            <div key={product._id} className="mt-1 pl-4">
              <table
                className={`w-full text-center h-[3rem] rounded-md ${
                  index % 2 !== 0 ? "bg-[#d9d9d91a]" : "bg-white"
                }`}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "25%",
                        textAlign: "left",
                        fontWeight: "normal",
                      }}
                    >
                      <div className="flex gap-2 items-center overflow-hidden">
                        <img
                          src={product.image}
                          className="w-[50px] h-[40px] object-cover rounded-md"
                          alt=""
                        />
                        {product.name}
                      </div>
                    </th>
                    <th
                      style={{
                        width: "5%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "normal",
                      }}
                    >
                      {product.price}
                    </th>
                    <th
                      style={{
                        width: "10%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "bolder",
                        color: "#4C49ED",
                        fontSize: "22px",
                      }}
                    >
                      {product.volume === -1 ? (
                        <p className=" text-black text-[10px] font-thin">
                          ไม่จำกัด
                        </p>
                      ) : (
                        product.volume
                      )}
                    </th>
                    <th
                      style={{
                        width: "10%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "normal",
                      }}
                    >
                      {product.createdAt.substring(0, 10)}
                    </th>
                    <th
                      style={{
                        width: "15%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "normal",
                      }}
                    >
                      {product.barcode == null ? <p>ไม่มี</p> : product.barcode}
                    </th>
                    <th
                      style={{
                        width: "15%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "normal",
                      }}
                    >
                      <ul className="flex justify-center gap-3">
                        <button className=" hover:scale-110"
                        onClick={ ()=> editClick(product._id)}
                        >
                          <AiFillEdit size={30} color="#36454f" />
                        </button>
                        <p className="text-[#cfd1d1]">|</p>
                        <button className=" hover:scale-110"
                        onClick={()=> deleteClick(product._id)}
                        >
                          <AiFillDelete size={30} color="#f75d59" />
                        </button>
                      </ul>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          ))}
        </div>
      )}
      <EditProduct 
      isEditModalOpen = {isEditModalOpen}
      closeEditModal = {closeEditModal}
      confirmEdit = {confirmEdit}
      />
      <DeleteProduct
      isDelelteModalOpen = {isDelelteModalOpen}
      closeDelelteModal = {closeDelelteModal}
      deleteConfirm = {deleteConfirm}
      />
    </div>
  );
}

export default OutStockProducts;
