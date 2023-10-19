import React from "react";
import "./categories.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import { filterProductsAsync } from "../../redux/slice/productSlice";
import { useNavigate } from "react-router";
function Categories() {
  const dispatch = useDispatch();
  const categoriesData = useSelector((state) => state.categories?.categories);
  const status = useSelector((state) => state.categories?.status);
  const navigate = useNavigate()
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);
  const handleCategoryClick = async (subcategoryId) => {
    console.log(subcategoryId)
    await dispatch(filterProductsAsync(subcategoryId));
    navigate("/products")
  };
  return (
    <div className="container pt-5">
        <h2 className="text-center pb-5">Shop From Various Collections</h2>
      <div className="categoriesGrid">
        {categoriesData?.map((category) =>
          category?.subcategories?.map((subcategory) => (
            <div
              className=" text-white fs-5 categoryCircle"
              onClick={() => handleCategoryClick(subcategory._id)}
              key={subcategory._id}
            >
              {subcategory?.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
