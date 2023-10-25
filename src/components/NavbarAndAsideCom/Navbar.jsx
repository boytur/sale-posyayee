import { useState, useEffect } from "react";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import userPic from "../../assets/img/user.png";
import { BiSearchAlt } from "react-icons/bi";
import { RiAddCircleFill } from "react-icons/ri";

let userName = '';

// eslint-disable-next-line react/prop-types
function Navbar({ addProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]); //รอเก็บข้อมูลเข้า Array products
  
  useEffect(()=>{
    userName = sessionStorage.getItem("user");
    if (userName != null){
      userName = userName.replace(/"/g, '');
    }
  })

  useEffect(() => {
    // Fetch API สินค้าทั้งหมด
    fetch("http://localhost:5500/view-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]); // ล้างผลลัพธ์ถ้าไม่มีคำค้นหา
    }
  }, [searchTerm, products]);

  return (
    <div className="h-[4.5rem] flex justify-between bg-white w-full">
      <Link to="/sale-products" className="flex items-center pl-8 gap-1 w-[24%]">
        <BsShop size={32} color="#4C49ED" />
        <h1 className="font-bold text-[2.7rem] pt-1">
          <span className="text-[#4C49ED]">POS</span>YAYEE
        </h1>
      </Link>
      <div className="w-[52%] flex justify-left p-1 text-[19px] items-center pl-5 relative">
        <div className="relative w-full  h-full mt-5">
          <div className="w-full  h-[50px] bg-[#F9FAFB]  rounded-[16px] flex items-center ">
            <BiSearchAlt size={30} className="z-20 text-[#737791] pl-2" />
            <input
              type="text"
              name="find-products"
              placeholder="ค้นหาสินค้า..."
              className="w-full bg-[#F9FAFB] text-[#737791] flex pl-10 h-full absolute placeholder-style outline-none rounded-[10px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="absolute bg-white w-[99.5%] z-50 overflow-y-auto  cursor-pointer rounded-md max-h-[90vh]">
            {searchResults.map((product, index) => (
              <div
                key={product._id}
                className={
                  index % 2 === 0
                    ? `flex items-center bg-white`
                    : `flex items-center bg-[#4545450f]`
                }
              >
                <div className=" w-[80px] p-2 h-[60px] flex items-center">
                  <img className=" object-cover w-full h-full rounded-md" src={product.image} alt="" />
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="p-2">
                    <p>{product.name}</p>
                  </div>
                  <div className="pr-5 flex gap-1">
                    <RiAddCircleFill
                      color="#4C49ED"
                      size={25}
                      className="hover:scale-105"
                      onClick={() => addProduct(product)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[52%] pr-2">
        <div className="flex p-1 items-center gap-4 justify-end h-full">
          <div className="font-semibold flex">
            <h1>สวัสดี</h1>
            <h1>, {userName}</h1>
          </div>
          <img src={userPic} className="w-[30px] h-[30]" alt="user" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;