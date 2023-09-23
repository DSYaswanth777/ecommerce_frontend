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
function Coupons() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [couponData, setCouponData] = useState({
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

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCouponNameChange = (e) => {
    setCouponData({
      ...couponData,
      name: e.target.value,
    });
  };
  const handleCouponExpirationChange = (e) => {
    setCouponData({
      ...couponData,
      expiration: e.target.value,
    });
  };
  const handleAddCoupon = () => {
    // Add your logic to handle adding a new coupon here
    // You can access the coupon data in `couponData`
    // Close the modal after adding the coupon
    toggleModal();
  };
  const handleEditCoupon = () => {
    // Add your logic to handle editing an existing coupon here
    // You can access the coupon data in `couponData`
    // Close the modal after editing the coupon
    toggleModal();
  };
  const handleAddNewCouponClick = () => {
    setMode("Add");
    setCouponData({
      name: "",
      expiration: "",
    });
    toggleModal();
  };

  const handleEditIconClick = (index) => {
    setMode("Edit");
    setSelectedCardIndex(index);
    const cardData = cards[index]; // Assuming you have an array of cards
    setCouponData({
      name: cardData.name,
      expiration: cardData.expiration,
    });
    toggleModal();
  };
  const handleDelete = (product) => {
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your Coupon Code is Safe :)", "error");
        }
      });
  };
  const cards = [
    // Add your card data here (you can use a map function)
    // Example:
    {
      id: 1,
      name: "Cotton",
      expiration: "2023-12-31",
    },
    {
      id: 2,
      name: "Cotton 2",
      expiration: "2023-12-31",
    },
    {
      id: 3,
      name: "Cotton 3",
      expiration: "2023-12-31",
    },
    {
      id: 4,
      name: "Cotton 3",
      expiration: "2023-12-31",
    },
    // Add more cards as needed
  ];

  return (
    <div>
      <div className="d-flex justify-content-between gap-5 align-items-center pb-5">
        <InputGroup className="d-flex justify-content-center align-items-center inpu w-50">
          <Input
            type="search"
            name=""
            id=""
            placeholder="Search your Coupon.."
            className="border border-end-0 input-searc w-50"
            onClick={(e) => e.stopPropagation()}
          />
          <InputGroupText className="p-2 input-tex">
            <BsSearch size={20} className="" />
          </InputGroupText>
        </InputGroup>
        <Button className="h-50" onClick={handleAddNewCouponClick}>
          Add New Coupon
        </Button>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center gap-3">
          {cards.map((card, index) => (
            <Card
              className="col-lg-4"
              key={card.id}
            
            >
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold fs-4">
                    Coupon Name:{" "}
                    <span className="fs-5 text-primary">{card.name}</span>
                  </div>
                  <div className="d-flex gap-3">
                    <div className="text-primary">
                      <FaEdit size={20}   onClick={() => handleEditIconClick(index)}/>
                    </div>
                    <div className="text-danger">
                      <AiOutlineDelete size={22} onClick={() => handleDelete(index)} />
                    </div>
                  </div>
                </div>
                <div className="pt-3">
                  Coupon Expiration <Badge>{card.expiration}</Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {mode === "Add" ? "Add Coupon" : "Edit Coupon"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="couponName">Coupon Name</Label>
            <ModalInput
              type="text"
              id="couponName"
              value={couponData.name}
              onChange={handleCouponNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="couponExpiration">Coupon Expiration (Date)</Label>
            <ModalInput
              type="date"
              id="couponExpiration"
              value={couponData.expiration}
              onChange={handleCouponExpirationChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {mode === "Add" ? (
            <Button color="primary" onClick={handleAddCoupon}>
              Add
            </Button>
          ) : (
            <Button color="primary" onClick={handleEditCoupon}>
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

export default Coupons;
