import React, { useState } from "react";
import {
    Input,
    Label,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
} from "reactstrap";

function CategoryCheckbox({ category, checked, onChange }) {
  return (
    <Label className="d-flex align-items-center">
      <Input
        type="checkbox"
        value={category}
        checked={checked}
        onChange={onChange}
        className="me-2"
      />
      {category}
    </Label>
  );
}
function Filters({ isOpen, toggleMenu, }) {
    const ordersFilterCategories = [
        "On The Way",
        "Deleivered",
        "Cancelled",
        "Last 30 days",
        "2023",
        "Older"
    ]      
  // Initialize state for selected categories
  const [selectedCategories, setSelectedCategories] = useState(
    ordersFilterCategories.reduce((acc, category) => {
      acc[category] = false; // Initialize all categories as unchecked
      return acc;
    }, {})
  );

  // Function to handle category checkbox changes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelectedCategories) => ({
      ...prevSelectedCategories,
      [category]: !prevSelectedCategories[category], // Toggle the selected state
    }));
  };

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
            <h6 className="text-uppercase">Order Status</h6>
            <hr />
            {ordersFilterCategories.map((category) => (
              <CategoryCheckbox
                key={category}
                category={category}
                checked={selectedCategories[category]}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default Filters;
