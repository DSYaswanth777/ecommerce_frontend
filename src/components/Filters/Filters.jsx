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
    const filterCategories = [
        "Saree",
        "Saree with Blouse Fabric",
        "Blouse",
        "Dress Materials",
        "Category 5",
        "Category 6",
    ]      
  // Initialize state for selected categories
  const [selectedCategories, setSelectedCategories] = useState(
    filterCategories.reduce((acc, category) => {
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
            <h4>Categories</h4>
            <hr />
            {filterCategories.map((category) => (
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
