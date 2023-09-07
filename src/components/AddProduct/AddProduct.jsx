import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from 'react-select'

function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const maxImages = 8;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [productMRP, setProductMRP] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productPrice, setProductPrice] = useState(""); // State for the calculated product price
  const categories = [
    { value: "Cotton", label: "Cotton", subcategories: ["Bengali Cotton", "Meena Cotton"] },
    { value: "Silk", label: "Silk", subcategories: ["Georgette Silk"] },
    // Add more categories and subcategories as needed
  ]
  const subcategories = selectedCategory
  ? categories.find((category) => category.value === selectedCategory.value)
      ?.subcategories.map((subcategory) => ({
        value: subcategory,
        label: subcategory,
      })) || []
  : [];
  // Function to calculate the product price based on MRP and discount
  const calculateProductPrice = () => {
    // Parse MRP and discount as numbers
    const mrp = productMRP;
    const discount =productDiscount;

    // Check if both MRP and discount are valid numbers
    if (!isNaN(mrp) && !isNaN(discount)) {
      // Calculate the product price
      const price = mrp - discount;
      setProductPrice(price); // Set the product price in state with 2 decimal places
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImages = Array.from(e.target.files);

    if (selectedImages.length + images.length <= maxImages) {
      setImages([...images, ...selectedImages]);

      const previewUrls = selectedImages.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviewUrls([...imagePreviewUrls, ...previewUrls]);
    } else {
      alert(`You can only upload up to ${maxImages} images.`);
    }
  };
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedSubCategory(null); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedImagePreviewUrls = [...imagePreviewUrls];

    updatedImages.splice(index, 1);
    updatedImagePreviewUrls.splice(index, 1);

    setImages(updatedImages);
    setImagePreviewUrls(updatedImagePreviewUrls);
  };

  return (
    <div className="container mt-5">
      <Card className="p-5 bg-light">
        <CardTitle className="text-center fs-2 fw-bold text-uppercase">Add Product</CardTitle>
        <CardBody>
          <Form>
            <Row>
              <Col sm="6">
                <Label>Product Name</Label>
                <Input />
              </Col>
              <Col sm="6">
                <Label>Product MRP</Label>
                <Input
                  value={productMRP}
                  type="number"
                  onChange={(e) => {
                    setProductMRP(e.target.value);
                    calculateProductPrice(); // Calculate product price when MRP changes
                  }}
                />
              </Col>
              <Col sm="6">
                <Label>Product Discount</Label>
                <Input
                  value={productDiscount}
                  type="number"
                  onChange={(e) => {
                    setProductDiscount(e.target.value);
                    calculateProductPrice(); // Calculate product price when discount changes
                  }}
                />
              </Col>
              <Col sm="6">
                <Label>Category</Label>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={categories}
                />
              </Col>
              <Col sm="6">
                <Label>Subcategory</Label>
                <Select
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  options={subcategories}
                />
              </Col>

              <Col sm="6">
                <Label>Product Stock</Label>
                <Input type="number"/>
              </Col>
              <Col sm="6">
                <Label>Product Price</Label>
                <Input value={productPrice} readOnly />
              </Col>
              <Col sm="12">
                <Label>Product Images (Max 8)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                {imagePreviewUrls.length > 0 && (
                  <div className="d-flex gap-5 rounded">
                    {imagePreviewUrls.map((url, index) => (
                      <div key={index} className="image-container">
                        <div className="image-overlay mt-2">
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                          >
                            X
                          </Button>
                        </div>
                        <img
                          src={url}
                          alt={`Product Image ${index}`}
                          width="200"
                          height="200"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
            <div className="text-center mt-4">


            <Button type="submit" color="primary" className="">Add Product</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddProduct;
