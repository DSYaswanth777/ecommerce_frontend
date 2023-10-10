import React, { useState } from "react";
import Header from "../Header/Header";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Filter } from "react-feather";
import Filters from "../Filters/Filters";
import Products from "../Products/Products";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchProductsAsync,
} from "../../redux/slice/productSlice";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import debounce from "lodash.debounce";

function Search() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedHandleSearch = debounce(() => {
    //**Dispatch the searchProductsAsync action with the debounced search query */ 
    dispatch(searchProductsAsync(debouncedSearchQuery));
  }, 300); // Adjust the delay time as needed

  useEffect(() => {
    // Only perform the search when debouncedSearchQuery changes
    if (debouncedSearchQuery || searchQuery === "") {
      debouncedHandleSearch();
    }
  }, [debouncedSearchQuery, searchQuery]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const productData = useSelector((state) => state.products?.products);
  const totalProducts = useSelector(
    (state) => state.products?.products?.length
  );
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const status = useSelector((state) => state.products?.status);
  const categories = useSelector((state) => state?.categories?.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesAsync());
    }
  }, [status, dispatch]);

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
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Sort By</DropdownToggle>
            <DropdownMenu className="mt-2">
              {["Featured", "Low to High", "High to Low"].map((option) => (
                <DropdownItem key={option}>{option}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
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
