import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sale from "./components/Sale";
import Stock from "./components/Stock";
import AddProduct from "./components/AddProduct";
import Analysis from "./components/Analysis";

function App() {
  return (
    <div className="bg-[#F9FAFB]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sale />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/view-stock" element={<Stock />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
