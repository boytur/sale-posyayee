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
import Swal from "sweetalert2"; // import SweetAlert2

function OutStockProducts() {
  const [stockProducts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelelteModalOpen, setDelelteModalOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("");

  const [_name, set_Name] = useState("");
  /* Edit modal */
  //เก็บ _id ไปเช็คเพื่อแก้ไขข้อมูล
  function editClick(_id, _name) {
    setIsEditModalOpen(!isEditModalOpen);
    console.log(_id);
    console.log(isEditModalOpen);
    openEditModal();
    setPlaceholder(_name);
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
  const [_id, set_idDelete] = useState("");
  // eslint-disable-next-line no-unused-vars
  function deleteClick(_id, _name) {
    set_idDelete(_id);
    setDelelteModalOpen(!isDelelteModalOpen);
    openDeleteModal();
    set_Name(_name);
  }

  const openDeleteModal = () => {
    setDelelteModalOpen(true);
  };
  const closeDelelteModal = () => {
    setDelelteModalOpen(false);
  };
  const deleteConfirm = () => {
    if (!_id) {
      console.log("ไม่มี _idDelete ที่จะลบ");
      return;
    }
    fetch(`http://localhost:5500/delete-product/${_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchProducts();
        //Alert เมื่อลบสินค้า
        Swal.fire({
          icon: "success",
          title: `${data.message}`,
          timer: 3000,
        });
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
        // Error alert
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลบข้อมูล",
          text: "กรุณาลองอีกครั้ง",
        });
      });
    closeDelelteModal();
  };

  /* Fecth API  view-outstock-product */
  const fetchProducts = () => {
    fetch("http://localhost:5500/view-outstock-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
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
                      {product.volume === -1 || product.volume == null ? (
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
                      {product.barcode == null || product.barcode === "" ? <p className="text-black text-[10px] font-thin">ไม่มี</p> : product.barcode}
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
                          onClick={() => editClick(product._id, product.name)}
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
      <EditProduct
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        confirmEdit={confirmEdit}
        placeholder={placeholder}
        _id = {_id}
      />
      <DeleteProduct
        isDelelteModalOpen={isDelelteModalOpen}
        closeDelelteModal={closeDelelteModal}
        deleteConfirm={deleteConfirm}
        _name={_name}
      />
    </div>
  );
}

export default OutStockProducts;