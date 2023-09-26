// AddProduct.js
import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Input } from "reactstrap";

function AddProduct({ isOpen, toggle, onSave, isEdit, product }) {
  const initialFormData = isEdit
    ? product
    : {
        productName: "",
        productImg: "",
        productPrice: "",
        productInfo: "",
        productColorOptions: "",
        subcategoryId: "",
        productStock: "",
      };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImg: file });
  };

  const handleSave = () => {
    onSave(formData);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{isEdit ? "Edit Product" : "Add Product"}</ModalHeader>
      <ModalBody className="d-flex flex-column gap-3">
        <Input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <Input
          type="file" 
          name="productImg"
          multiple
          onChange={handleFileChange}
        />
        <Input
          type="text"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          placeholder="Price "
        />
        <Input
          type="textarea"
          name="productInfo"
          value={formData.productInfo}
          onChange={handleChange}
          placeholder="Product Info"
        />
  
        <Input
          type="text"
          name="subcategoryId"
          value={formData.subcategoryId}
          onChange={handleChange}
          placeholder="Subcategory"
        />
        <Input
          type="number"
          name="productStock"
          value={formData.productStock}
          onChange={handleChange}
          placeholder="Stock"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          {isEdit ? "Save" : "Add"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddProduct;
