import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  Input,
  InputGroup, InputGroupText
} from "reactstrap";
// import "./Header.scss";
const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="heade  bg-light sticky-to ">
      <hr />
      <div className="d-flex justify-content-betwee gap-5 align-items-center container pb-3 ">
        <InputGroup className="  d-flex justify-content-center align-items-center input">
          <Input
            type="search"
            name=""
            id=""
            placeholder="Search your product..."
            className=" border border-end-0 inpu"
          />
          <InputGroupText className="p-2 input-text ">
            <BsSearch size={20} className="" />
          </InputGroupText>
        </InputGroup>
      </div>
    </div>
  );
};

export default Navbar;
