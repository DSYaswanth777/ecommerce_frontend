// Products.js
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import Logo from "../../../assets/icons/brand_logo.svg";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import AddProduct from "./AddProduct";
import { BsSearch } from "react-icons/bs";

function Products() {
  const [productData, setProductData] = useState([
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$20",
      productInfo: "Lorem ipsum dolor sit amet",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$30",
      productInfo: "Consectetur adipiscing elit",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$25",
      productInfo: "Sed do eiusmod tempor",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$20",
      productInfo: "Lorem ipsum dolor sit amet",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$30",
      productInfo: "Consectetur adipiscing elit",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$25",
      productInfo: "Sed do eiusmod tempor",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$20",
      productInfo: "Lorem ipsum dolor sit amet",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$30",
      productInfo: "Consectetur adipiscing elit",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$25",
      productInfo: "Sed do eiusmod tempor",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$20",
      productInfo: "Lorem ipsum dolor sit amet",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$30",
      productInfo: "Consectetur adipiscing elit",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productPrice: "$25",
      productInfo: "Sed do eiusmod tempor",
      subcategoryId: "789",
      productStock: 100,
    },
  ]); // Your initial product data
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (formData) => {
  };

  const handleEditProduct = (formData) => {
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

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
          Swal.fire("Cancelled", "Your Product is Safe :)", "error");
        }
      });
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    setSelectedProduct(null);
    setEdit(false);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEdit(true);
    toggleModal();
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "Product Image",
      cell: (row) => (
        <img
          src={row.productImg}
          alt={row.productName}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      name: "Price",
      selector: (row) => row.productPrice,
      sortable: true,
    },

    {
      name: "Product Info",
      selector: (row) => row.productInfo,
    },
    {
      name: "Subcategory ID",
      selector: (row) => row.subcategoryId,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.productStock,
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <div className="text-primary">
          <FaEdit size={18} onClick={() => handleEditClick(row)} />
        </div>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <div className="text-danger">
          <FaTrash size={18} onClick={() => handleDelete(row)} />
        </div>
      ),
    },
  ];
  

  return (
    <div className=" mb-5 shadow w-100 justify-content-center align-items-center gap-2 mt-2 border p-5 pt-2">
      <div className="d-flex justify-content-between gap-5 align-items-center">
        <img src={Logo} alt="" />
        <InputGroup className="d-flex justify-content-center align-items-center inpu w-50">
            <Input
              type="search"
              name=""
              id=""
              placeholder="Search your product..."
              className="border border-end-0 input-searc w-50"
              onClick={(e) => e.stopPropagation()}
            />
            <InputGroupText className="p-2 input-tex">
              <BsSearch size={20} className="" />
            </InputGroupText>
          </InputGroup>
        <Button className="h-50" onClick={toggleModal}>
          Add New Product
        </Button>
      </div>
      <DataTable
        title="Product List"
        columns={columns}
        data={productData}
        pagination
        fixedHeader
        pointerOnHover
        paginationPerPage={10}
      />

      <AddProduct
        isOpen={isModalOpen}
        toggle={toggleModal}
        onSave={isEdit ? handleEditProduct : handleAddProduct}
        isEdit={isEdit}
        product={selectedProduct}
      />
    </div>
  );
}

export default Products;
