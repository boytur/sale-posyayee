/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../assets/css/Login.css";
import { BsShop } from "react-icons/bs";
import axios from "axios";
import { auth } from "../services/Authorize";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // import SweetAlert2

function Login({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  // กำหนด state สำหรับ username และ password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // เพิ่ม state สำหรับเก็บข้อผิดพลาด
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับตรวจสอบว่ากำลังโหลดข้อมูลหรือไม่

  // ฟังก์ชันเมื่อผู้ใช้เปลี่ยนค่า username
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // ฟังก์ชันเมื่อผู้ใช้เปลี่ยนค่า password
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // ฟังก์ชันเมื่อผู้ใช้กดปุ่มเข้าสู่ระบบ
  const handleLogin = () => {
    if (username.length !== 0) {
      axios
        .post("http://localhost:5500/login", { username, password })
        .then((response) => {
          // ตั้งค่า isAuthenticated เป็น true
          setIsAuthenticated(true);
          auth(response, navigate("/sale-products"));
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในเข้าสู่ระบบ",
              text: error,
            });
          } else {
            setError("เข้าสู่ระบบไม่สำเร็จ");
          }
        });
    }
  };

  useEffect(() => {
    // ตรวจสอบว่ามีข้อมูล username และ token ใน sessionStorage หรือไม่
    const storedUsername = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUsername && storedToken) {
      // ถ้ามีข้อมูลใน sessionStorage แสดงว่าผู้ใช้เคยเข้าสู่ระบบแล้ว
      // ให้ตั้งค่า isAuthenticated เป็น true
      setIsAuthenticated(true);
    }

    setLoading(false); // แสดงว่าข้อมูลได้รับการโหลดแล้ว
  }, []); // ให้ useEffect ทำงานเมื่อคอมโพเนนต์นี้ถูกโหลดครั้งแรก

  // ถ้ากำลังโหลดข้อมูล ให้แสดง "กำลังโหลด..."
  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  // ถ้าล็อกอินแล้ว ให้ไม่แสดงข้อมูลต่าง ๆ บนหน้าล็อกอิน
  if (isAuthenticated) {
    return navigate("/sale-products");
  }
  
  return (
    <div className="login-background">
      <div className="w-[380px] h-[514px] bg-white rounded-md flex-col z-50">
        <div className="flex items-center gap-1 justify-center mt-7">
          <BsShop size={32} color="#4C49ED" />
          <h1 className="font-bold text-[2.7rem] pt-[3.3px]">
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </h1>
        </div>
        <div className="text-[32px] text-center mt-4">
          <p>Signin</p>
        </div>
        <div className="w-full px-6 mb-6 md:mb-0">
          <label
            className="block tracking-wide text-gray-600 text-l mb-2 text-left pl-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="appearance-none block w-full
            text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] bg-white"
            id="username"
            type="text"
            placeholder="sangjun@posyayee"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="w-full px-6 mb-6">
          <label
            className="block tracking-wide text-gray-600 text-l mb-2 text-left pl-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none block w-full text-gray-700 border rounded py-3 px-2 mb-3 leading-tight focus:outline-[#4C49ED] bg-white text"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full px-6 mb-6 mt-[33px]">
          <input
            className="appearance-none block h-[52px] w-full bg-[#4C49ED] cursor-pointer text-white border rounded py-3 px-2 mb-3 leading-tight hover.bg-[#4c49edd6] hover.border-2 hover.border-[#4c49ed81]"
            type="submit"
            value="เข้าสู่ระบบ"
            onClick={handleLogin}
          />
          <div className="flex mt-5 ml-[1px]">
            <p>ติดต่อโปรแกรมเมอร์</p>&nbsp;
            <a
              target="_blank"
              className="underline text-blue-600"
              href="https://www.facebook.com/profile.php?id=100084796533376"
              rel="noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
