/* eslint-disable react/prop-types */
/*
  OutStockProducts.jsx เป็นหน้าย่อยของ Stock.jsx
  โดยตัวมันเองจะแสดงสินค้าที่ใกล้จะหมด


  **เพิ่มเติม**
  มีการรับ prob มาจาก Stock.jsx เพื่อลดการ call API ดังนี้
  outStockProducts = สินค้าที่มีจำนวนน้อยกว่า 5 ชิ้น,
  fetchProducts = ฟังก์ชัน fetch สินค้า ,
  loading = เช็คหน้าโหลดระหว่างรอ Fecth API 
   
  DATE : 11/ตุลาคม/2023
  OWNER : piyawat W.

*/

import { useState, useEffect } from "react";
import "../../../assets/css/StockLoadingSpinner.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditProduct from "../../PopupComponents/EditProduct";
import DeleteProduct from "../../PopupComponents/DeleteProduct";

function OutStockProducts({ outStockProducts, loading, fetchProducts }) {
  //Modal การแก้ไขสินค้า
  const [idEdit, setIdEdit] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [placeholderName, setPlaceholderName] = useState(""); //ส่ง Placeholder ชื่อ
  const [placeholderPrice, setPlaceholderPrice] = useState(""); //ส่ง Placeholder ราคา
  const [placeholderVolume, setPlaceholderVolume] = useState(""); //ส่ง Placeholder จำนวน
  const [placeholderImage, setPlaceholderImage] = useState(""); //ส่ง Placeholder รูป

  //Modal การลบสินค้า
  const [isDelelteModalOpen, setDelelteModalOpen] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");

  /************** Edit modal *************
   เก็บ _id ไปเช็คเพื่อแก้ไขข้อมูล
   เก็บ name เพื่อไปทำเป็น placeholder ใน modal
   ****************************************/

  function editClick(_id, n, p, v, i) {
    setIsEditModalOpen(!isEditModalOpen);
    openEditModal();
    setIdEdit(_id);
    setPlaceholderName(n);
    setPlaceholderPrice(p);
    setPlaceholderVolume(v);
    setPlaceholderImage(i);
    console.log(placeholderImage);
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

  /************** Delete modal *************
  เก็บ _id ไปเช็คเพื่อแก้ไขข้อมูล
  เก็บ name เพื่อไปทำเป็นแจ้งเตือนก่อนลบ ใน modal
****************************************/
  function deleteClick(_id, n) {
    setIdDelete(_id);
    setDelelteModalOpen(!isDelelteModalOpen);
    openDeleteModal();
    setNameDelete(n);
  }
  const openDeleteModal = () => {
    setDelelteModalOpen(true);
  };
  const closeDelelteModal = () => {
    setDelelteModalOpen(false);
  };
  //valodate ข้อมูลก่อนส่งลบ
  const deleteConfirm = () => {
    if (!idDelete) {
      console.log("ไม่มี id ที่จะลบ");
      return;
    }
    closeDelelteModal();
  };

  /****** Fetch สินค้าทุกครั้งที่มีการเปลี่ยนแปลง *******/
  useEffect(() => {
    document.title = "POSYAYEE 🛒 สินค้าใกล้จะหมด";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  /********************************************/

  return (
    <div>
      {loading ? (
        <div className=" flex justify-center mt-[10%]">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div
          className=" overflow-y-scroll"
          style={{ maxHeight: "calc(100vh - 12rem)" }}
        >
          {outStockProducts.map((product, index) => (
            <div key={product._id} className="pl-4">
              <table
                className={`w-full text-center h-[3rem] rounded-md hover:bg-[#E4E3FF] cursor-pointer ${
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
                          src={`${product.image}`}
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
                        fontWeight: "bold",
                      }}
                    >
                      ฿{product.price}
                    </th>
                    <th
                      style={{
                        width: "10%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "bolder",
                        color: "#4C49ED",
                        fontSize: "25px",
                      }}
                    >
                      {product.volume == null ? (
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
                      {product.barcode == null || product.barcode === "" ? (
                        <p className="text-black text-[10px] font-thin">
                          ไม่มี
                        </p>
                      ) : (
                        product.barcode
                      )}
                    </th>
                    <th
                      style={{
                        width: "15%",
                        borderLeft: "2px solid #ffff",
                        fontWeight: "normal",
                      }}
                    >
                      <ul className="flex justify-center gap-3">
                        <button
                          className=" hover:scale-110"
                          onClick={() =>
                            editClick(
                              product._id,
                              product.name,
                              product.price,
                              product.volume,
                              product.image
                            )
                          }
                        >
                          <AiFillEdit size={30} color="#36454f" />
                        </button>
                        <p className="text-[#cfd1d1]">|</p>
                        <button
                          className=" hover:scale-110"
                          onClick={() => deleteClick(product._id, product.name)}
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

      {/* ส่ง prob ไปใช้ที่ EditProduct.jsx 
          isisEditModalOpen = เช็คว่า modal เปิดอยู่ไหม
          closeEditModal = ปิด modal 
          confirmEdit = กดตกลงจะแก้ไข
          placeholder = มาจากชื่อสินค้าที่ต้องการจะลบเพื่อแสดง placeholder ที่ modal
          _id = _id ที่จะแก้ไข
          fetchProducts = ฟังก์ชัน fetch สินค้าเอาไว้ใช้ตอนแก้ไขเสร็จ(รีเฟรชออโต้)
      */}
      <EditProduct
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        confirmEdit={confirmEdit}
        _id={idEdit}
        placeholderName={placeholderName}
        placeholderPrice={placeholderPrice}
        placeholderVolume={placeholderVolume}
        placeholderImage={placeholderImage}
        fetchProducts={fetchProducts}
      />
      {/* ส่ง prob ไปใช้ที่ EditProduct.jsx 
          isDelelteModalOpen = เช็คว่า modal เปิดอยู่ไหม
          closeDelelteModal= ปิด modal 
          deleteConfirm = กดตกลงจะแก้ไข
          name = เอาชื่อสินค้าที่จะลบไปใช้เพื่อแสดงหน้า modal
          _id = _id ที่จะลบ
          fetchProducts = ฟังก์ชัน fetch สินค้าเอาไว้ใช้ตอนลบสร็จ(รีเฟรชออโต้)
      */}
      <DeleteProduct
        isDelelteModalOpen={isDelelteModalOpen}
        closeDelelteModal={closeDelelteModal}
        deleteConfirm={deleteConfirm}
        name={nameDelete}
        _id={idDelete}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default OutStockProducts;
