// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { BsFillDatabaseFill, BsDatabaseFillAdd } from "react-icons/bs";
import { IoMdAnalytics } from "react-icons/io";
import { Link } from "react-router-dom";
import userPic from "../../assets/img/user.png";
import { FaBars } from "react-icons/fa";

let userName = "";
function Aside() {
  const navigate = useNavigate();
  const location = useLocation();

  // กำหนดปุ่มที่เป็น "active" ตามเส้นทางปัจจุบัน
  const getActiveButton = (route) => {
    return location.pathname === route ? "bg-[#E4E3FF] text-[#4C49ED]" : "";
  };

  // ฟังก์ชันสำหรับการนำทางไปยังเส้นทางอื่น ๆ
  const handleNavigate = (route) => {
    navigate(route);
  };

  useEffect(() => {
    userName = sessionStorage.getItem("user");
    if (userName != null) {
      userName = userName.replace(/"/g, "");
    }
  });

  return (
    <div className="bg-white md:w-[20rem] lg:w-[20rem] hidden full text-[#646771] h-[100vh] md:flex">
      <div className="p-3 pt-2">
        <Link
          to="/sale-products"
          className="flex items-center gap-1 w-full justify-center"
        >
          <h1 className="font-bold text-[2.7rem] text-black flex items-center">
            <FaBars size={32} color="#4C49ED" />
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </h1>
        </Link>
        <div className=" flex justify-start h-[6rem] mt-10">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/sale-products"
            )}`}
            onClick={() => handleNavigate("/sale-products")}
          >
            <GoHomeFill size={20} />
            <p>ขายของหน้าร้าน</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/view-stock"
            )}`}
            onClick={() => handleNavigate("/view-stock")}
          >
            <BsFillDatabaseFill size={20} />
            <p>ดูสต็อกสินค้า</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/add-product"
            )}`}
            onClick={() => handleNavigate("/add-product")}
          >
            <BsDatabaseFillAdd size={20} />
            <p>เพิ่มสต็อกสินค้า</p>
          </button>
        </div>
        <div className="flex justify-start h-[6rem]">
          <button
            className={`flex gap-2 items-center text-[1.3rem] font-semibold w-full p-12 rounded-lg ${getActiveButton(
              "/analysis"
            )}`}
            onClick={() => handleNavigate("/analysis")}
          >
            <IoMdAnalytics size={20} />
            <p>วิเคราะห์ยอดขาย</p>
          </button>
        </div>
        <div className="p-6"
          style={{ height: "calc(100vh - 33rem)" }}>
            <div className="flex items-center relative top-[90%]">
            <div>
            <img src={userPic} className="w-[30px] h-[30]" alt="user" />
          </div>
          <div className="font-semibold flex pl-2 text-sm">
            <h1>สวัสดี</h1>
            <h1>, {userName}</h1>
          </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Aside;
