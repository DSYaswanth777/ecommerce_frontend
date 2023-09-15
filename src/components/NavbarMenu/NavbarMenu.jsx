import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

const NavbarMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        toggle={toggleMenu}
        scrollable
        className="nav-menu"
      >
        <OffcanvasHeader toggle={toggleMenu} className="text-center bg-white">
          GSR Handlooms
        </OffcanvasHeader>
        <OffcanvasBody className="nav-menu">
          <div className="d-flex flex-column justify-content-center align-items-center gap-5 pt-5">
            <div>Home</div>
            <div>About Us</div>
            <div>Products</div>
            <div>Contact Us</div>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default NavbarMenu;
