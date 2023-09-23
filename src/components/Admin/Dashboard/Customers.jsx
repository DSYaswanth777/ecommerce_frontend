import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Customers() {
  const [productData, setProductData] = useState([
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$20",
      productDiscount: "10%",
      productInfo: "Lorem ipsum dolor sit amet",
      productColorOptions: "Red, Blue",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$30",
      productDiscount: "15%",
      productInfo: "Consectetur adipiscing elit",
      productColorOptions: "Green, Yellow",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$25",
      productDiscount: "5%",
      productInfo: "Sed do eiusmod tempor",
      productColorOptions: "Black, White",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$20",
      productDiscount: "10%",
      productInfo: "Lorem ipsum dolor sit amet",
      productColorOptions: "Red, Blue",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$30",
      productDiscount: "15%",
      productInfo: "Consectetur adipiscing elit",
      productColorOptions: "Green, Yellow",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$25",
      productDiscount: "5%",
      productInfo: "Sed do eiusmod tempor",
      productColorOptions: "Black, White",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$20",
      productDiscount: "10%",
      productInfo: "Lorem ipsum dolor sit amet",
      productColorOptions: "Red, Blue",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$30",
      productDiscount: "15%",
      productInfo: "Consectetur adipiscing elit",
      productColorOptions: "Green, Yellow",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$25",
      productDiscount: "5%",
      productInfo: "Sed do eiusmod tempor",
      productColorOptions: "Black, White",
      subcategoryId: "789",
      productStock: 100,
    },
    {
      productName: "Product 1",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$20",
      productDiscount: "10%",
      productInfo: "Lorem ipsum dolor sit amet",
      productColorOptions: "Red, Blue",
      subcategoryId: "123",
      productStock: 50,
    },
    {
      productName: "Product 2",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$30",
      productDiscount: "15%",
      productInfo: "Consectetur adipiscing elit",
      productColorOptions: "Green, Yellow",
      subcategoryId: "456",
      productStock: 25,
    },
    {
      productName: "Product 3",
      productImg: "https://via.placeholder.com/50",
      productMRP: "$25",
      productDiscount: "5%",
      productInfo: "Sed do eiusmod tempor",
      productColorOptions: "Black, White",
      subcategoryId: "789",
      productStock: 100,
    },
  ]); // Your initial product data
  const columns = [
    {
      name: "Name",
      selector: "productName",
      sortable: true,
    },
    {
      name: "Email",
      selector: "productMRP",
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: "productInfo",
    },
    {
      name: "Orders",
      selector: "productDiscount",
      sortable: true,
    },
    {
      name: "Joined Date",
      selector: "productInfo",
    },
  ];
  return (
    <div className="container bg-white shadow rounded border border-2">
      <DataTable
        title="Customers"
        columns={columns}
        data={productData}
        pagination
        fixedHeader
        pointerOnHover
        paginationPerPage={10}
      />
    </div>
  );
}

export default Customers;
