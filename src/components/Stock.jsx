// eslint-disable-next-line no-unused-vars
import React from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";

function Stock() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Aside />
      </div>
    </div>
  );
}

export default Stock;
