import React, { useState } from "react";
import Header from "../Header/Header";
import { Button } from "reactstrap";
import { Filter } from "react-feather";
import Filters from "../Filters/Filters";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchProductsAsync,
  sortproductsAsync,
} from "../../redux/slice/productSlice";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import debounce from "lodash.debounce";
import Select from "react-dropdown-select";

function Search() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const productData = useSelector((state) => state.products?.products);
  const totalProducts = useSelector(
    (state) => state.products?.products?.length
  );

  const dispatch = useDispatch();
  const status = useSelector((state) => state.products?.status);
  const categories = useSelector((state) => state?.categories?.categories);
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  useEffect(() => {
    // Only perform the search when debouncedSearchQuery changes
    if (debouncedSearchQuery || searchQuery === "") {
      debouncedHandleSearch();
    }
  }, [debouncedSearchQuery, searchQuery]);
  const debouncedHandleSearch = debounce(() => {
    //**Dispatch the searchProductsAsync action with the debounced search query */
    
    dispatch(searchProductsAsync(debouncedSearchQuery));
  }, 300);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (menuOpen === true) {
      dispatch(fetchCategoriesAsync());
    }
  }, [menuOpen, dispatch]);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "lowtohigh", label: "Low to High" },
    { value: "hightolow", label: "High to Low" },
  ];
  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setDebouncedSearchQuery={setDebouncedSearchQuery}
        setSearchQuery={setSearchQuery}
      />
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
