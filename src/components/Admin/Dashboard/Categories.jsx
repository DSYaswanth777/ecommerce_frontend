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
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategoryAsync,
  fetchCategoriesAsync,
} from "../../../redux/slice/categoriesSlice";
function Categories() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [CategoryData, setCategoryData] = useState({
    name: "",
    expiration: "",
  });
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const [mode, setMode] = useState("Add"); // Add or Edit mode
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const { categories, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCategoryNameChange = (e) => {
    setCategoryData({
      ...CategoryData,
      name: e.target.value,
    });
  };
  const handleCategoryExpirationChange = (e) => {
    setCategoryData({
      ...CategoryData,
      expiration: e.target.value,
    });
  };
  const handleAddCategory = () => {
    // Add your logic to handle adding a new Category here
    // You can access the Category data in `CategoryData`
    // Close the modal after adding the Category
    toggleModal();
  };
  const handleEditCategory = () => {
    // Add your logic to handle editing an existing Category here
    // You can access the Category data in `CategoryData`
    // Close the modal after editing the Category
    toggleModal();
  };
  const handleAddNewCategoryClick = () => {
    setMode("Add");
    setCategoryData({
      name: "",
      expiration: "",
    });
    toggleModal();
  };

  const handleEditIconClick = (index) => {
    setMode("Edit");
    setSelectedCardIndex(index);
    const cardData = cards[index]; // Assuming you have an array of cards
    setCategoryData({
      name: cardData.name,
      expiration: cardData.expiration,
    });
    toggleModal();
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

  const cards = [
    // Add your card data here (you can use a map function)
    // Example:
    {
      id: 1,
      name: "Cotton",
      subCategories: "Super1, Super2, Super3",
    },
    {
      id: 2,
      name: "Cotton 2",
      subCategories: "Super1, Super2, Super3",
    },
    {
      id: 3,
      name: "Cotton 3",
      subCategories: "Super1, Super2, Super3",
    },
    {
      id: 4,
      name: "Cotton 3",
      subCategories: "Super1, Super2, Super3",
    },
  ];

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
        <Button className="h-50" onClick={handleAddNewCategoryClick}>
          Add New Category
        </Button>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center gap-3">
          {categories.categories.map((card, index) => (
            <Card className="col-lg-4" key={card.id}>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold fs-4">
                    Category Name:{" "}
                    <span className="fs-5 text-primary">{card.name}</span>
                  </div>
                  <div className="d-flex gap-3">
                    <div className="text-primary">
                      <FaEdit
                        size={20}
                        onClick={() => handleEditIconClick(index)}
                      />
                    </div>
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
        <ModalHeader toggle={toggleModal}>
          {mode === "Add" ? "Add Category" : "Edit Category"}
        </ModalHeader>
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
          <FormGroup>
            <Label for="CategoryExpiration">Category Expiration (Date)</Label>
            <ModalInput
              type="date"
              id="CategoryExpiration"
              value={CategoryData.expiration}
              onChange={handleCategoryExpirationChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {mode === "Add" ? (
            <Button color="primary" onClick={handleAddCategory}>
              Add
            </Button>
          ) : (
            <Button color="primary" onClick={handleEditCategory}>
              Edit
            </Button>
          )}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Categories;
