import {useState} from "react";
import Aside from "../../NavbarAndAsideCom/Aside";
import AddExisingProduct from "./AddExisingProduct";
import AddNewProduct from "./AddNewProduct";

function AddProduct() {
  let [btnCheck, setBtnCheck] = useState(true);
  function onBtnClick() {
    setBtnCheck(!btnCheck);
  }
  return (
    <div>
      <div className="flex w-full h-full">
        {/* Import Aside มาใช้ */}
        <Aside />
        <div className="w-[80%] flex flex-col pl-1 pt-4">
          <div className="w-full h-[4rem] text-[#4C49ED] text-[32px] font-semibold items-center flex pl-4 ">
            <div>
              <h1>เพิ่มสต็อกสินค้า</h1>
            </div>
          </div>
          <div>
            <div className="flex gap-6 w-full bg-white pl-4  h-[3rem] items-center border-b">
              <button
                onClick={onBtnClick}
                className={btnCheck ? "text-[#4C49ED] underline" : "text-black"}
              >
                <p>เพิ่มสินค้าใหม่</p>
              </button>
              <button
                onClick={onBtnClick}
                className={
                  !btnCheck ? "text-[#4C49ED] underline" : "text-black"
                }
              >
                <p>เพิ่มจำนวนสินค้าเดิม</p>
              </button>
            </div>
          </div>
          {btnCheck ? <AddNewProduct/> : <AddExisingProduct />}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
