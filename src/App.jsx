import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sale from "./components/MainComponents/SaleProductCom/Sale";
import Stock from "./components/MainComponents/StockProductCom/Stock";
import AddProduct from "./components/MainComponents/AddProductCom/AddProduct";
import Analysis from "./components/MainComponents/AnalysisCom/Analysis";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // กำหนดตัวแปร isAuthenticated

  return (
    <div className="bg-[#F9FAFB]">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                isAuthenticated={isAuthenticated} // ส่ง isAuthenticated เข้าไปใน Login component
                setIsAuthenticated={setIsAuthenticated} // ส่งฟังก์ชันเพื่ออัปเดต isAuthenticated
              />
            }
          />
          <Route
            path="/sale-products"
            element={
              isAuthenticated ? <Sale /> : <Navigate to="/" /> // ตรวจสอบ isAuthenticated
            }
          />
          <Route
            path="/add-product"
            element={
              isAuthenticated ? <AddProduct /> : <Navigate to="/" /> // ตรวจสอบ isAuthenticated
            }
          />
          <Route path="/view-stock" element={isAuthenticated ? <Stock /> : <Navigate to="/" />} />
          <Route path="/analysis" element={isAuthenticated ? <Analysis /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
