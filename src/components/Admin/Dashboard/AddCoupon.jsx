import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCouponAsync,
  editCouponAsync,
  fetchCoupons,
} from "../../../redux/slice/couponSlice";
import moment from "moment-timezone";
import { fetchCustomers } from "../../../redux/slice/customerSlice";

function AddCoupon({ isOpen, toggle, isEditing, couponData }) {
  const [formData, setFormData] = useState({
    code: "",
    discountedAmount: "",
    maxUses: "",
    expirationDate: "",
    forSpecificUser: false, // New field for checkbox
    targetUsers: [], // New field for dropdown
  });
  const [isUploading, setIsUploading] = useState(false);
  const customersData = useSelector((state) => state.customers?.customers);
  const status = useSelector((state) => state.customers?.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCustomers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchCoupons());
    if (isEditing && couponData) {
      setFormData({
        code: couponData.code,
        discountedAmount: couponData.discountedAmount,
        maxUses: couponData.maxUses,
        expirationDate: moment(couponData.expirationDate)
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DDTHH:mm"),
          
      });
    }
  }, [dispatch, isEditing, couponData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
  
    const addCouponData = {
      code: formData.code,
      discountedAmount: formData.discountedAmount,
      maxUses: formData.maxUses,
      expirationDate: moment(formData.expirationDate)
        .tz("Asia/Kolkata")
        .toISOString(),
      forSpecificUser: formData.forSpecificUser,
      targetUsers: formData.targetUsers, // Send only _id values
    };
    try {
      if (isEditing) {
        const editCouponData = {
          code: formData.code,
          discountedAmount: formData.discountedAmount,
          maxUses: formData.maxUses,
          expirationDate: formData.expirationDate,
          forSpecificUser: formData.forSpecificUser,
          targetUsers: formData.targetUsers, // Send only _id values
        };
  
        const couponId = couponData._id;
  
        await dispatch(editCouponAsync({ id: couponId, ...editCouponData }));
        dispatch(fetchCoupons());
        toggle();
      } else {
        await dispatch(addCouponAsync(addCouponData));
      }
      toggle();
      dispatch(fetchCoupons());
    } catch (error) {
      // Handle the error
    } finally {
      setIsUploading(false);
    }
  };
  
  
  return (
    <div className="w-100">
      <Modal isOpen={isOpen} toggle={toggle} className="w-100" >
        <ModalHeader toggle={toggle}>
          {isEditing ? "Edit Coupon" : "Add New Coupon"}
        </ModalHeader>
        <ModalBody>
          {isUploading ? (
            <div className="text-center">
              <Spinner color="primary" />
              {isEditing ? (
                <p>Please Wait...</p>
              ) : (
                <p>Please wait while adding your Coupon..</p>
              )}
            </div>
          ) : (
            <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
              <Label>Coupon Code</Label>
              <Input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />

              <Label>Coupon Discounted Amount</Label>
              <Input
                type="number"
                name="discountedAmount"
                value={formData.discountedAmount}
                onChange={handleInputChange}
                required
              />

              <Label>Max Usage</Label>
              <Input
                type="number"
                name="maxUses"
                value={formData.maxUses}
                onChange={handleInputChange}
              />

              <Label>Expiry Date</Label>
              <Input
                type="datetime-local"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                required
              />

              {/* New checkbox for specific users */}
              <Label>
                <Input
                  type="checkbox"
                  name="forSpecificUser"
                  checked={formData.forSpecificUser}
                  onChange={handleInputChange}
                />{" "}
                Specific Users
              </Label>

              {/* New dropdown for selecting users */}
              {formData.forSpecificUser && (
                <>
                  <Label>Select Users</Label>
                  <Input
                    type="select"
                    name="targetUsers"
                    multiple
                    value={formData.targetUsers}
                    onChange={handleInputChange}
                  >
                    {customersData.map((customer) => (
                      <option key={customer.id} value={customer.id} className="bg-light border border-dark w-100 p-2">
                        {`${customer.name} - ${customer.mobile}`}
                      </option>
                    ))}
                  </Input>
                </>
              )}

              <div className="d-flex justify-content-end gap-3">
                <Button type="submit" variant="success">
                  Save
                </Button>
                <Button variant="danger" onClick={toggle}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AddCoupon;
