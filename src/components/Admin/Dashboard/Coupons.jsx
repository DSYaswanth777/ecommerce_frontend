import React, { useEffect, useState } from "react";
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
import { addCouponAsync, deleteCouponAsync, fetchCoupons } from "../../../redux/slice/couponSlice";
import { formatCurrency } from "../../../utilities/formatCurrency";
function Coupons() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [couponData, setCouponData] = useState({
    code: null,
    expirationDate: null,
    discountedAmount:null,
    maxUses: null,
  });
  const { coupons, isLoading, error } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [editingCouponData, setEditingCouponData] = useState(null);
  console.log("Coupon Data:", couponData);

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const [mode, setMode] = useState("Add");
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const handleCouponNameChange = (e) => {
    setCouponData({
      ...couponData,
      code: e.target.value,
    });
  };
  const handleCouponExpirationChange = (e) => {
    setCouponData({
      ...couponData,
      expirationDate: e.target.value,
    });
  };
  const handleCouponDiscountedAmount = (e) => {
    setCouponData({
      ...couponData,
      discountedAmount: e.target.value,
    });
  };
  const handleCouponMaxUses = (e) => {
    setCouponData({
      ...couponData,
      maxUses: e.target.value,
    });
  };

  const handleAddCoupon = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found in localStorage");
      return;
    }
  
    // Prepare the data object to send in the request body
    const requestData = {
      code: couponData.code,
      maxUses: parseInt(couponData.maxUses),
      expirationDate: couponData.expirationDate,
      discountedAmount: parseFloat(couponData.discountedAmount),
    };
  
    // Make the API call with the Authorization header
    fetch("http://localhost:3000/api/v1/admin/add/coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include the token here
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add coupon");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data as needed
        console.log("Coupon added successfully", data);
  
        // You may want to refresh the list of coupons after adding
        dispatch(fetchCoupons());
  
        // Close the modal
        toggleModal();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error adding coupon:", error);
      });

  };
  
  
  const handleEditCoupon = () => {
    setMode("Edit");
    setEditingCouponData(coupons.coupons[index]);
    toggleModal();
  };
  const handleAddNewCouponClick = () => {
    setMode("Add");
    setCouponData({
      code: null,
      expirationDate: null,
      discountedAmount: null,
      maxUses: null,
    });
    toggleModal();
  };
  const handleEditIconClick = () => {
    setMode("Edit");
    setCouponData({
      code: "",
      expirationDate: "",
      discountedAmount: "",
      maxUses: "",
    });
    toggleModal();
  };
  const handleDelete = (couponId) => {
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
          dispatch(deleteCouponAsync(couponId))
            .then(() => {
              // After successfully deleting the category, refresh the categories data
              dispatch(fetchCoupons());
            })
            .catch((error) => {
              // Handle any errors that occur during the deletion process
              console.error("Error deleting coupon:", error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your Coupon Code is Safe :)", "error");
        }
      });
  };

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
          {coupons.coupons?.map((card, index) => (
            <Card className="col-lg-4" key={card.id}>
              <CardBody>
                <div className="d-flex justify-content-between">
                  <div className="fw-bold fs-4">
                    Coupon Name:{" "}
                    <span className="fs-5 text-primary">{card.code}</span>
                    <div className="fw-bold fs-4">
                      Coupon Discount:{" "}
                      <span className="fs-5 text-primary">
                        {formatCurrency(card.discountedAmount)}
                      </span>
                    </div>
                    <div className="fw-bold fs-4">
                      Maximum Usage:{" "}
                      <span className="fs-5 text-primary">{card.maxUses}</span>
                    </div>
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
                  Coupon Expiration <Badge>{card.expirationDate}</Badge>
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
              name="code"
              type="text"
              id="couponName"
              value={
                mode === "Edit" && editingCouponData
                  ? editingCouponData.name
                  : couponData.name
              }
              onChange={handleCouponNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="couponExpiration">Coupon Expiration (Date)</Label>
            <ModalInput
              type="date"
              name="expirationDate"
              id="couponExpiration"
              value={
                mode === "Edit" && editingCouponData
                  ? editingCouponData.expiration
                  : couponData.expiration
              }
              onChange={handleCouponExpirationChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="couponUsages">Coupon Usage</Label>
            <ModalInput
              type="number"
              name="maxUses"
              id="couponUsages"
              value={
                mode === "Edit" && editingCouponData
                  ? editingCouponData.maxUses
                  : couponData.maxUses
              }
              onChange={handleCouponMaxUses}
            />
          </FormGroup>
          <FormGroup>
            <Label for="couponDiscount">Discount Amount</Label>
            <ModalInput
              type="number"
              name="discountedAmount"
              id="couponDiscount"
              value={
                mode === "Edit" && editingCouponData
                  ? editingCouponData.discountedAmount
                  : couponData.discountedAmount
              }
              onChange={handleCouponDiscountedAmount}
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
