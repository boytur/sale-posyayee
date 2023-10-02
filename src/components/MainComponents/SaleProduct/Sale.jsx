/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Aside from "../../NavbarAndAsideCom/Aside";
import Scan from "./Scan";
import Navbar from "../../NavbarAndAsideCom/Navbar";
import LoadingSpinner from "../../LoaddingComponents/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Sale() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  // Function to add a product to the cart
  function addProduct(product) {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item._id === product._id
    );

    if (existingProductIndex !== -1) {
      // If it exists, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If it doesn't exist, add it to the cart with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5500/view-product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false on error as well
      });
  }, []);

  // Filter products where barcode is null
  const filteredProducts = products.filter(
    (product) => product.barcode === null
  );

  return (
    <div>
      <div>
        {/* Import Navbar */}
        <Navbar />
      </div>
      <div className="flex h-[90vh]">
        {/* การแจ้งเตือน */}
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Import Aside */}
        <Aside />
        <div className="w-[40%] flex bg-white flex-wrap justify-center full overflow-y-scroll gap-1">
          {/* If still loading, display loading spinner */}
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            // If fetching API is done, display products
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="w-[160px]"
                onClick={() => addProduct(product)}
              >
                <div className="border h-[200px] flex flex-col rounded-md bg-white cursor-pointer hover:border-[3px] hover:border-[#0085FF]">
                  <img
                    className="h-[8rem] object-cover rounded-lg p-1"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="text-left pl-2 pt-3 overflow-hidden h-[2.1rem] text-sm">
                    <p>{product.name}</p>
                  </div>
                  <div className="font-bold text-[#4C49ED] pl-2 text-[20px]">
                    <h1>{product.price.toFixed(2)} ฿</h1>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Render the Scan component and pass cart and setCart as props */}
        <Scan cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default Sale;
