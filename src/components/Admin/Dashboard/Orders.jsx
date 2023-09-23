import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FiRefreshCw } from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';
import 'react-date-range/dist/styles.css'; // Import the CSS styles
import 'react-date-range/dist/theme/default.css'; // Import the default theme

function Orders() {
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
      name: "#Order",
      selector: "productName",
      sortable: true,
    },
    {
      name: "Product",
      selector: "productMRP",
      sortable: true,
    },
    {
      name: "Product Category",
      selector: "productDiscount",
      sortable: true,
    },
    {
      name: "Payment",
      selector: "productInfo",
    },
    {
      name: "Order Date",
      selector: "productInfo",
    },
    {
      name: "Order Status",
      selector: "productColorOptions",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="text-primary">
          <FaDownload size={18} onClick={() => handleEditClick(row)} />
        </div>
      ),
    },
  ];


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-5 bg-white rounded border border-3 p-3">
        <div className="fs-3">Orders</div>
        <div className="fw-bold fs-5">
          Sales Period: 
          <input type='date'className='ms-3'/>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="fs-5">
            Data refresh <span className="text-primary"> <FiRefreshCw size={20} /></span>
          </div>
          <div className="bg-secondary text-white p-2 rounded">September 23, 2023 15:12 PM</div>
        </div>
      </div>
      <div className="shadow mt-4">
        <DataTable
          title="Orders"
          columns={columns}
          data={productData}
          pagination
          fixedHeader
          pointerOnHover
          paginationPerPage={10}
        />
      </div>
    </div>
  );
}

export default Orders;
