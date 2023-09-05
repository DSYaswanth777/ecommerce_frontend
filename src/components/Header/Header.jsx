import React from "react";
import Logo from "../../assets/icons/brand_logo.svg";
import { FiSearch, FiShoppingCart } from "react-icons/fi"; // Import FiSearch
import { BsSuitHeart } from "react-icons/bs";

import "./Header.scss";
import { Badge, Input, InputGroup, InputGroupText } from "reactstrap";

const Header = () => {
  return (
    <div className="  header shadow p-3 bg-white  ">
      <div className="container">
        <div className="d-flex justify-content-around align-items-center">
          <h2 className="logo logo_text">
            GSR <span className="fs-3 ">Handlooms</span>
          </h2>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <InputGroup className="input rounded border border-dark border-2">
{/*               
              <div className="d-flex justify-content-center align-items-center p-2">
                <FiSearch size={20} /> 
              </div> */}
              <Input type="search" name="" id="" placeholder="Search" />
            </InputGroup>
            <div className=" d-flex gap-3">
              <FiShoppingCart size={22} />
              <BsSuitHeart size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
