import React from "react";
import under500 from "../../assets/images/under500.png";
import under1000 from "../../assets/images/under1000.png";
import under1500 from "../../assets/images/under1500.png";
import under2000 from "../../assets/images/under2000.png";
import Tops from "../../assets/images/Tops.png";
import LongFrocks from "../../assets/images/long_frocks.png";
import DressMaterials from "../../assets/images/dress_materials.png";
import SuperDiscountedSarees from "../../assets/images/super_dicounted_sarees.png";
import "./Categories.scss"
function Categories() {
  return (
    <div className="container mt-5">
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <div className="category-container shadow">
              <img src={category.image} alt="" className="img-fluid border rounded " />
              <div className="overlay ">
                <div className="overlay-content">
                  <h3>Shop Now</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const categories = [
  { image: under500 },
  { image: under1000 },
  { image: under1500 },
  { image: under2000 },
  { image: Tops },
  { image: LongFrocks },
  { image: DressMaterials },
  { image: SuperDiscountedSarees },
];

export default Categories;
