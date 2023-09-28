import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  Badge,
  Card,
  CardBody,
  Input,
  InputGroupText,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input as ModalInput,
} from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  categoryAddAsync,
  deleteCategoryAsync,
  deleteSubCategoryAsync,
  fetchCategoriesAsync,
  subCategoryAddAsync,
} from "../../../redux/slice/categoriesSlice";
function Categories() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [CategoryData, setCategoryData] = useState({
    name: "",
  });
  const [isSubcategoryModalOpen, setSubcategoryModalOpen] = useState(false);
  const [iscategoryModalOpen, setcategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryData, setSubcategoryData] = useState({
    name: "",
    categoryId: "", 
  });

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const { categories, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();



  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryData({
      ...CategoryData,
      name: e.target.value,
    });
  };
  const handleAddCategory = async () => {
    setCategoryData({
      name: "",
    });
    await dispatch(categoryAddAsync(CategoryData));
    // After adding the category, refresh the categories data
    dispatch(fetchCategoriesAsync());
    toggleModal();
  };
  const handleAddSubCategory = async () => {
    setCategoryData({
      name: "",
    });
    await dispatch(
      subCategoryAddAsync({
        body: {
          name: subcategoryData.name,
        },
        categoryId: subcategoryData.categoryId,
      })
    );
    dispatch(fetchCategoriesAsync());
    toggleSubcategoryModal();
  };
  const handleDeleteSubCategory = async (categoryId, subcategoryId) => {
    try {
      await dispatch(
        deleteSubCategoryAsync({
          categoryId,
          subcategoryId,
        })
      );
      
      // Close the subcategory modal
      togglecategoryModal();
      
      // Fetch updated categories data to refresh the page
      await dispatch(fetchCategoriesAsync());
    } catch (error) {
      // Handle any errors that occur during deletion
      console.error("Error deleting subcategory:", error);
    }
  };
  const handleDelete = (categoryId) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to get back!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Dispatch the deleteCategoryAsync action with the categoryId to delete
          dispatch(deleteCategoryAsync(categoryId))
            .then(() => {
              // After successfully deleting the category, refresh the categories data
              dispatch(fetchCategoriesAsync());
            })
            .catch((error) => {
              // Handle any errors that occur during the deletion process
              console.error("Error deleting category:", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your Category Code is Safe :)", "error");
        }
      });
  };
  const togglecategoryModal = () => {
    setcategoryModalOpen(!iscategoryModalOpen);
  };
  const toggleSubcategoryModal = () => {
    setSubcategoryModalOpen(!isSubcategoryModalOpen);
    fetchCategoriesAsync()
  };
  const handleSubcategoryNameChange = (e) => {
    setSubcategoryData({
      ...subcategoryData,
      name: e.target.value,
    });
  };
  const handleCategoryDropdownChange = (e) => {
    setSubcategoryData({
      ...subcategoryData,
      categoryId: e.target.value,
    });
  };
  const handleCategoryCardClick = (category) => {
    setSelectedCategory(category);
    togglecategoryModal();
  };

  return (
    <div>
      <div className="d-flex justify-content-between gap-5 align-items-center pb-5">
        <InputGroup className="d-flex justify-content-center align-items-center inpu w-50">
          <Input
            type="search"
            name=""
            id=""
            placeholder="Search your Category.."
            className="border border-end-0 input-searc w-50"
            onClick={(e) => e.stopPropagation()}
          />
          <InputGroupText className="p-2 input-tex">
            <BsSearch size={20} className="" />
          </InputGroupText>
        </InputGroup>
        <div className="d-flex">
          <Button className="h-50" onClick={() => toggleModal()}>
            Add New Category
          </Button>
          <Button className="h-50 ms-3" onClick={toggleSubcategoryModal}>
            Add a Subcategory
          </Button>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center gap-3">
          {categories.categories.map((card) => (
            <Card
              className="col-lg-4"
              key={card._id}
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryCardClick(card)}
            >
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold fs-4">
                    Category Name:{" "}
                    <span className="fs-5 text-primary">{card.name}</span>
                  </div>
                  <div className="d-flex gap-3">
                    <div className="text-danger">
                      <AiOutlineDelete
                        size={22}
                        onClick={() => handleDelete(card._id)}
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  Sub-Categories :{" "}
                  {card.subcategories.map((subcategory) => (
                    <Badge key={subcategory._id} className="me-2">
                      {subcategory.name}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="CategoryName">Category Name</Label>
            <ModalInput
              type="text"
              id="CategoryName"
              value={CategoryData.name}
              onChange={handleCategoryNameChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddCategory}>
            Add
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={isSubcategoryModalOpen} toggle={toggleSubcategoryModal}>
        <ModalHeader toggle={toggleSubcategoryModal}>
          Add a Subcategory
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="SubcategoryName">Subcategory Name</Label>
            <ModalInput
              type="text"
              id="SubcategoryName"
              value={subcategoryData.name}
              onChange={handleSubcategoryNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="CategoryDropdown">Select a Category</Label>
            <Input
              type="select"
              name="category"
              id="CategoryDropdown"
              value={subcategoryData.categoryId}
              onChange={handleCategoryDropdownChange}
            >
              <option value="">Select a category</option>
              {categories.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddSubCategory}>
            Add
          </Button>
          <Button color="secondary" onClick={toggleSubcategoryModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={iscategoryModalOpen} toggle={togglecategoryModal}>
        <ModalHeader toggle={togglecategoryModal}>
          {selectedCategory && selectedCategory.name}
        </ModalHeader>
        <ModalBody>
          {selectedCategory &&
            selectedCategory.subcategories.map((subcategory) => (
              <div
                key={subcategory._id}
                className="d-flex justify-content-between"
              >
                <h4>{subcategory.name}</h4>
                <div className="text-danger">
                  <AiOutlineDelete
                    size={22}
                    onClick={() =>handleDeleteSubCategory(selectedCategory._id,subcategory._id)}
                  />
                </div>
              </div>
            ))}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={togglecategoryModal}>
            Save
          </Button>
          <Button color="secondary" onClick={togglecategoryModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Categories;
