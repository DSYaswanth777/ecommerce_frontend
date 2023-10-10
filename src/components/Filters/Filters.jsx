import React from "react";
import { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Input,
  Label,
} from "reactstrap";

function Filters({
  isOpen,
  toggleMenu,
  categories,
}) {
  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        toggle={toggleMenu}
        scrollable
        className="nav-menu"
      >
        <OffcanvasHeader toggle={toggleMenu} className="text-center bg-white">
          Filters
        </OffcanvasHeader>
        <hr />
        <OffcanvasBody className="nav-menu">
          <div>
            <h4>Categories</h4>
            <hr />
            {categories?.map((category) => (
              <div key={category._id}>
                <h5 className="bg-success text-white p-2 rounded">
                  {category.name}
                </h5>
                {category?.subcategories?.map((subcategory) => (
                  <div key={subcategory._id}>
                    <Label className="ms-2">
                      <Input
                        type="checkbox"
                        value={subcategory.name}
                        className="border-dark me-2"
                      />
                      {subcategory.name}
                    </Label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default Filters;
