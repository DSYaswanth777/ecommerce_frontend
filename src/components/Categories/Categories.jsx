import React from "react";
import "./Categories.scss";

function Categories() {
  return (
    <div className="container mt-5 ">
      <h2 className="text-center">Shop By Price</h2>
      <div className="categoriesGrid ">
        {types.map((type, index) => (
          <div className="" key={index}>
            <div className="shape ">
              <p className="text-center pt-5 mt-5  text-white shadow-lg border-5 border-dark">
                {type.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const types = [
  { price: "under 500" },
  { price: "under 1000" },
  { price: "under 1500" },
  { price: "under 2000" },
  { price: "Tops" },
  { price: "Long Frocks" },
  { price: "Dress Materials" },
  { price: "On Discount" },
];

export default Categories;
