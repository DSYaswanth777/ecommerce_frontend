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
import { fetchProducts } from "../../redux/slice/productSlice";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";

function Search() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <Header />
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
