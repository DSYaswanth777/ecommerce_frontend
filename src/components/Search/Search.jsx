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

function Search() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div>
      <Header />
      <div className="container">
        <h5 className="pt-5">100 results found for "shh"</h5>
        <div className="d-flex justify-content-between pt-3">
          <Button onClick={toggleMenu}> <Filter/> <span>Filters</span></Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Sort By</DropdownToggle>
            <DropdownMenu className="mt-2">
              <DropdownItem defaultChecked>Featured</DropdownItem>
              <DropdownItem>Low to High</DropdownItem>
              <DropdownItem>High to Low</DropdownItem>
              <DropdownItem>Newest First</DropdownItem>
              <DropdownItem>Oldest First</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Products/>
      </div>
      <Filters isOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default Search;
