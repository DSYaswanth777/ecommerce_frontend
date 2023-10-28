import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import Logo from "../../assets/icons/brand_logo.svg";
import { fetchCategoriesAsync } from "../../redux/slice/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ChevronRight, LogOut } from "react-feather";
import { filterProductsAsync } from "../../redux/slice/productSlice";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { logoutSuccess } from "../../redux/slice/authSlice";

const NavbarMenu = ({ isOpen, toggleMenu }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories?.categories);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSubcategories = searchParams.get("subcategories")
    ? searchParams.get("subcategories").split(",")
    : [];
  const [selectedSubcategories, setSelectedSubcategories] =
    useState(initialSubcategories);
  const handleSubcategoryChange = (subcategory) => {
    let updatedSubcategories;
    if (selectedSubcategories.includes(subcategory._id)) {
      updatedSubcategories = selectedSubcategories.filter(
        (id) => id !== subcategory._id
      );
    } else {
      updatedSubcategories = [...selectedSubcategories, subcategory._id];
    }
    setSelectedSubcategories(updatedSubcategories);

    // Update URL with subcategories parameter
    setSearchParams(
      new URLSearchParams({
        ...searchParams,
        subcategories: updatedSubcategories.join(","),
      })
    );
  };
  const navigate = useNavigate();
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
  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/login");
  };
  const handleSubCatClick = (subcatID) => {
    // Dispatch the action and handle the redirect
    dispatch(filterProductsAsync(subcatID))
      .then(() => {
        // Redirect to the /products route after filtering is successful
        navigate(`/products?subcategories=${subcatID}`);
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
            <p className="bg-light border-bottom p-2">Home</p>
            <p className="bg-light border-bottom p-2">About Us</p>

            {categories?.map((category) => (
              <div key={category._id}>
                <p
                  onClick={() => toggleCategory(category._id)}
                  className="border-bottom p-2 fs-6 rounded"
                  style={{ backgroundColor: "#2d7b8b", color: "#ffff" }}
                >
                  {category.name} <ChevronRight className="ms-2" size={15} />
                </p>
                {expandedCategory === category._id && (
                  <div className="bg-light p-1 ps-2">
                    {category?.subcategories?.map((subcat) => (
                      <p
                        key={subcat.id}
                        className="border-bottom border-2 p-2"
                        onClick={() => handleSubCatClick(subcat._id)}
                        onChange={() => handleSubcategoryChange(subcat)}
                        isOpen={isOpen}
                        toggle={toggleMenu}
                      >
                        {subcat.name}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <p className="bg-light border-bottom p-2">Contact Us</p>
            <a className="text-dark ms- bg-light p-2 border-bottom "
            onClick={handleLogout}
            >
              Logout <LogOut className="ms-2 text-danger"/>
            </a>
          </div>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default NavbarMenu;
