import React, { useState } from "react";
import Header from "../Header/Header";
import { Button } from "reactstrap";
import { Filter } from "react-feather";
import Filters from "../Filters/Filters";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  sortproductsAsync,
} from "../../redux/slice/productSlice";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import Select from "react-dropdown-select";

function Search() {
  const [menuOpen, setMenuOpen] = useState(false);
  const productData = useSelector((state) => state.products?.products);
  const totalProducts = useSelector(
    (state) => state.products?.products?.length
  );

  const dispatch = useDispatch();
  const status = useSelector((state) => state.products?.status);
  const categories = useSelector((state) => state?.categories?.categories);
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(sortproductsAsync("featured"));
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (menuOpen === true) {
      dispatch(fetchCategoriesAsync());
    }
  }, [menuOpen, dispatch]);

  useEffect(() => {
    if (selectedSortOption != null) {
      dispatch(sortproductsAsync(selectedSortOption[0].value));
    }
  }, [selectedSortOption, dispatch]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "lowtohigh", label: "Low to High" },
    { value: "hightolow", label: "High to Low" },
    { value: "hightolow&maxPrice=500", label: "Under 500" },
    { value: "hightolow&maxPrice=1000", label: "Under 1000" },
    { value: "hightolow&maxPrice=1500", label: "Under 1500" },
    { value: "hightolow&maxPrice=2000", label: "Under 2000" },
  ];
  return (
    <div>
      <Header />
      <div className="container pt-3">
        <div className="d-flex justify-content-between pt-3">
          <Button onClick={toggleMenu}>
            {" "}
            <Filter /> <span>Filters</span>
          </Button>

          <Select
            value={selectedSortOption}
            options={sortOptions}
            onChange={(selectedOption) => {
              dispatch(
                sortproductsAsync(
                  selectedOption ? selectedOption[0].value : null
                )
              );
              setSelectedSortOption(selectedOption);
            }}
            placeholder="Sort By"
            className="text-dark"
          />
        </div>
        <Products productData={productData} />
        <h5 className="pt-5 text-center">
          Showing total of {totalProducts} items{" "}
        </h5>
      </div>
      <Filters
        isOpen={menuOpen}
        toggleMenu={toggleMenu}
        categories={categories}
      />
    </div>
  );
}

export default Search;
