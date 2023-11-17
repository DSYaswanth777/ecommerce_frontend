import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import { ChevronDown } from "react-feather";
import "./Navbar.scss";
import { filterProductsAsync } from "../../redux/slice/productSlice";
import { useNavigate } from "react-router";
function Navbar() {
  const categories = useSelector((state) => state?.categories?.categories);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

const navigate = useNavigate()
  useEffect(() => {
    if(isLoaded){

      dispatch(fetchCategoriesAsync());
    }
  }, [isLoaded,dispatch]);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const handleCategoryHover = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  const handleSubCatClick = (subcatID) => {
    // Dispatch the action and handle the redirect
    if (isLoaded) {
      dispatch(filterProductsAsync(subcatID))
        .then(() => {
          // Redirect to the /products route after filtering is successful
          navigate(`/products?subcategories=${subcatID}`);
        })
        .catch((error) => {
          // Handle errors if needed
          console.error("Filtering products failed:", error);
        });
    }
  };
  return (
    <>
      <div className="bg-light border shadow-sm text- navbar-container  container rounded pt-2 mb-2 pb-1 ">
        <div
          className="categories-list d-flex justify-content-between list-unstyled"
          onMouseLeave={handleCategoryLeave}
        >
          {categories.slice(0, 6).map((category) => (
            <div
              key={category._id}
              onMouseEnter={() => handleCategoryHover(category._id)}
            >
              <div className="d-flex justify-content-center   rounded ">
                <div className=" fs-6 fw-bold text-uppercase" style={{ cursor: "pointer" ,color:"#2A798B" }}>
                  {category.name} 
                  <ChevronDown size={18} className="mx-1" />
                </div>
                <div></div>
              </div>
              {activeCategory === category._id && (
                <div className="subcategories-list list-unstyled d-flex flex-column gap-2 ">
                  {category.subcategories.map((subcategory) => (
                    <u key={subcategory._id} className=" text-left text- fw-bold  p-2" style={{ cursor: "pointer",color:"#830D37" }}
                    onClick={() => handleSubCatClick(subcategory._id)}
                    
                    >
                      {subcategory.name}
                    </u>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
