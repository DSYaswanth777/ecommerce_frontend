import React, { useState } from "react";
import {
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Input,
  Label,
  Button,
} from "reactstrap";
import {
  fetchProducts,
  filterProductsAsync,
} from "../../redux/slice/productSlice";
import { useDispatch } from "react-redux";

function Filters({ isOpen, toggleMenu, categories }) {
  // Initialize state to store selected subcategory IDs
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const dispatch = useDispatch();
  // Function to handle checkbox changes
  const handleSubcategoryChange = (subcategory) => {
    // Check if the subcategory is already selected
    if (selectedSubcategories.includes(subcategory._id)) {
      // If selected, remove it from the list
      setSelectedSubcategories(
        selectedSubcategories.filter((id) => id !== subcategory._id)
      );
    } else {
      // If not selected, add it to the list
      setSelectedSubcategories([...selectedSubcategories, subcategory._id]);
    }
  };
  const isButtonDisabled = selectedSubcategories.length === 0;

  // Function to call the filterProductsAsync function with selected subcategories
  const applyFilters = () => {
    // Call your filter function with the selected subcategory IDs
    dispatch(filterProductsAsync(selectedSubcategories));
    toggleMenu();
  };
  const resetFilters = () => {
    // Clear selected subcategories
    setSelectedSubcategories([]);
    // Close the Offcanvas
    toggleMenu();
    // Call fetchProductsAsync to reset the filters
    dispatch(fetchProducts());
  };
  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        toggle={toggleMenu}
        scrollable
        className="nav-menu"
      >
        <OffcanvasHeader
          toggle={toggleMenu}
          className="text-center bg-white border-bottom border-3 border-dark"
        >
          <h4 className="text-start">Categories</h4>
          <div className="d-flex justify-content-between gap-5 pt-2">
            <Button
              onClick={applyFilters}
              color="success"
              disabled={isButtonDisabled}
            >
              Apply Filters
            </Button>
            <Button color="danger" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </OffcanvasHeader>
        <OffcanvasBody className="nav-menu">
          <div>
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
                        checked={selectedSubcategories.includes(
                          subcategory._id
                        )}
                        onChange={() => handleSubcategoryChange(subcategory)}
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
