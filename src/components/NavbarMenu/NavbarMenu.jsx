import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import Logo from "../../assets/icons/brand_logo.svg";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ChevronRight, Plus } from "react-feather";
import { filterProductsAsync } from "../../redux/slice/productSlice";
import { useNavigate } from "react-router";

const NavbarMenu = ({ isOpen, toggleMenu }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    if (isOpen === true) {
      dispatch(fetchCategoriesAsync());
    }
  }, [isOpen, dispatch]);

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null); // Collapse the category if it's already expanded
    } else {
      setExpandedCategory(categoryId); // Expand the clicked category
    }
  };

  const handleSubCatClick = (subcatID) => {
    // Dispatch the action and handle the redirect
    dispatch(filterProductsAsync(subcatID))
      .then(() => {
        // Redirect to the /products route after filtering is successful
        navigate("/products");
      })
      .catch((error) => {
        // Handle errors if needed
        console.error("Filtering products failed:", error);
      });
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
          <img src={Logo} width={120} alt="" />
        </OffcanvasHeader>
        <OffcanvasBody className="nav-menu">
          <div className="d-flex flex-column justify-content-start">
            {categories?.map((category) => (
              <div key={category._id}>
                <p
                  onClick={() => toggleCategory(category._id)}
                  className="border-bottom p-1 fs-5"
                >
                  {category.name} <ChevronRight className="ms-2" />
                </p>
                {expandedCategory === category._id && (
                  <div className="bg-light">
                    {category?.subcategories?.map((subcat) => (
                      <p
                        key={subcat.id}
                        className="border-bottom border-2"
                        onClick={() => handleSubCatClick(subcat._id)}
                      >
                        {subcat.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default NavbarMenu;
