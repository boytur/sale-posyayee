// eslint-disable-next-line no-unused-vars
import React from "react";
import "../assets/css/Login.css";
import { BsShop } from "react-icons/bs";

function Login() {
  return (
    <div className="login-background">
      <div className="w-[380px] h-[514px] bg-white rounded-md flex-col z-50">
        <div className="flex items-center gap-1 justify-center mt-7">
          <BsShop size={32} color="#4C49ED" />
          <h1 className="font-bold text-[2.7rem] pt-[3.3px]">
            <span className="text-[#4C49ED]">POS</span>YAYEE
          </h1>
        </div>
        {/* *************************************** */}
        <div className=" font-bold text-[32px] text-center mt-4">
          <p>Signin</p>
        </div>
        <div className="w-full px-6 mb-6 md:mb-0">
          <label
            className="block  tracking-wide text-gray-600 text-l font-bold mb-2 text-left pl-1"
            htmlFor=""
          >
            Username
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="sangjun@yayee" // Use the _id prop as a placeholder
          />
        </div>
        {/* *************************************** */}
        <div className="w-full px-6 mb-6">
          <label
            className="block  tracking-wide text-gray-600 text-l font-bold mb-2 text-left pl-1"
            htmlFor=""
          >
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="password"
            placeholder="******************"
          />
        </div>
        {/* *************************************** */}
        <div className="w-full px-6 mb-6 mt-[33px]">
          <input
            className="appearance-none block h-[52px] w-full bg-[#4C49ED]
            cursor-pointer text-white border  rounded py-3 px-2 mb-3 leading-tight
            hover:bg-[#4c49edd6]"
            type="submit"
            value="เข้าสู่ระบบ"
          />
          <div className="flex mt-5 ml-[1px]">
          <p>ติดต่อโปรแกรมเมอร์</p>&nbsp;
          <a target="_blank" className="underline text-blue-600" href="https://www.facebook.com/profile.php?id=100084796533376" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
