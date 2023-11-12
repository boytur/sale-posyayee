import { useState, useEffect } from "react";
import { Line} from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Aside from "../../NavbarAndAsideCom/Aside";
import '../../../assets/css/LoadingAnalysis.css';
import {
  FcPositiveDynamic,
  FcCurrencyExchange,
  FcCalendar,
  FcMoneyTransfer,
} from "react-icons/fc";

function Analysis() {
  const [salesData, setSalesData] = useState({});
  const API_KEY = import.meta.env.VITE_POSYAYEE_API_KEY;
  useEffect(() => {
    fetch(`${API_KEY}/view-dailysale`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let [color , setColor ] = useState('');
  function colorLine(){
    if (salesData.day1 < salesData.day2){
      setColor('#fe0000')
    }
    else {
      setColor('#4C49ED')
    }
  }
  const data = {
    labels: ["7 วันที่แล้ว", "6 วันที่แล้ว", "5 วันที่แล้ว", "4 วันที่แล้ว", "3 วันที่แล้ว", "2 วันที่แล้ว", "วันนี้"],
    datasets: [
      {
        label: "ยอดขาย 7 วันย้อนหลัง",
        data: [
          salesData?.day7,
          salesData?.day6,
          salesData?.day5,
          salesData?.day4,
          salesData?.day3,
          salesData?.day2,
          salesData?.day1,
        ],
        fill: false,
        borderColor: color,
        backgroundColor:'#FFFFFF',
        tension: 0.1,
      },
    ],
  };
  let day1 = salesData.day1;
  let day2 = salesData.day2;
  let day3 = salesData.day3;
  let day4 = salesData.day4;
  let day5 = salesData.day5;
  let day6 = salesData.day6;
  let day7 = salesData.day7;

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}, 0.2)`;
  }
  
  const backgroundColor = [];
  const borderColor = [];
  
  for (let i = 0; i < 7; i++) {
    const randomColor = getRandomColor();
    backgroundColor.push(randomColor);
    borderColor.push(randomColor.replace('0.2', '1'));
  }
  
  const barData = {
    labels: ["วันนี้", "2 วันที่แล้ว", "3 วันที่แล้ว", "4 วันที่แล้ว", "5 วันที่แล้ว", "6 วันที่แล้ว", "7 วันที่แล้ว"],
    datasets: [{
      label: 'ยอดขาย 7 วันย้อนหลัง',
      data: [day1, day2, day3, day4, day5, day6, day7],
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1
    }]
  };  
  
  useEffect(() => {
    colorLine();
    document.title = "POSYAYEE 📈 วิเคราะห์ยอดขาย"
  })
  return (
    <div>
      <div className="flex w-full h-full">
        <Aside />
        <div className="w-[80%] flex flex-col pl-1 pt-4">
          <div className="w-full font-semibold items-center flex pl-4 mt-2">
            <div>
              <h1 className=" text-[#4C49ED] text-[32px]">วิเคราะห์ยอดขาย</h1>
            </div>
          </div>
          <div className="w-full h-[13rem]  gap-5 flex items-center px-5">
            <div className="w-[25%] h-[80%] rounded-md flex-col bg-[#FFE2E5]">
              <div className="flex-col w-full  text-center mt-4">
                <div className=" flex justify-center">
                  <FcMoneyTransfer size={60} />
                </div>
                <div className="text-[2.2rem] text-center">
                  <div className=" flex justify-center">
                  {salesData && salesData.day1 == null
                      ? <p className="loading-spinner"></p>
                      : salesData.day1.toLocaleString("en-US")}
                  </div>
                </div>
                <div className=" text-l text-[#425166]">
                  <p>ยอดขายวันนี้</p>
                </div>
              </div>
            </div>
            <div className="w-[25%] h-[80%] rounded-md flex-col bg-[#FFF4DE]">
              <div className="flex-col w-full  text-center mt-4">
                <div className=" flex justify-center">
                  <FcPositiveDynamic size={60} />
                </div>
                <div className="text-[2.2rem] text-center">
                  <div className=" flex justify-center">
                  {salesData && salesData.day1 == null
                      ? <p className="loading-spinner"></p>
                      : salesData.day2.toLocaleString("en-US")}
                  </div>
                </div>
                <div className=" text-l text-[#425166]">
                  <p>ยอดขายเมื่อวาน</p>
                </div>
              </div>
            </div>
            <div className="w-[25%] h-[80%]  rounded-md flex-col bg-[#E4E3FF]">
              <div className="flex-col w-full  text-center mt-4">
                <div className=" flex justify-center">
                  <FcCurrencyExchange size={60} />
                </div>
                <div className="text-[2.2rem] text-center">
                  <div className=" flex justify-center">
                  {salesData && salesData.day1 == null
                      ? <p className="loading-spinner"></p>
                      : salesData.totalSalesLast7Days.toLocaleString("en-US")}
                  </div>
                </div>
                <div className=" text-l text-[#425166]">
                  <p>ยอดขาย 7 วันที่ผ่านมา</p>
                </div>
              </div>
            </div>
            <div className="w-[25%] h-[80%] rounded-md flex-col bg-[#FFD5A4]">
              <div className="flex-col w-full  text-center mt-4">
                <div className=" flex justify-center">
                  <FcCalendar size={60} />
                </div>
                <div className="text-[2.2rem] text-center">
                  <div className=" flex justify-center">
                  {salesData && salesData.day1 == null
                      ? <p className="loading-spinner"></p>
                      : salesData.totalSalesLast30Days.toLocaleString("en-US")}
                  </div>
                </div>
                <div className=" text-l text-[#425166]">
                  <p>ยอดขาย 30 วันที่ผ่านมา</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
          <div className="w-[50%] h-[20rem] mt-4">
            <Line data={data} />
          </div>
          <div className="w-[50%] h-[20rem] mt-4">
            <Bar data={barData} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
