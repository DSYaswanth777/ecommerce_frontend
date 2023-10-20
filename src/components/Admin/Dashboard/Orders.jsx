import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FiRefreshCw } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // Import the CSS styles
import "react-date-range/dist/theme/default.css"; // Import the default theme
import { fetchAdminOrders } from "../../../redux/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
const formatDateForInput = (isoDate) => {
  if (!isoDate) {
    return ""; 
  }

  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    return ""; // Handle invalid date
  }

  return format(date, "dd/MM/yyyy");
};
function Orders() {
  const ordersData = useSelector((state) => state?.orders?.orders?.orders);
  console.log(ordersData);
  const status = useSelector((state) => state.orders?.status);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAdminOrders());
    }
  }, [status, dispatch]);

  const columns = [
    {
      name: "#Order",
      selector: (row) => row.orderID,
      sortable: true,
    },
    {
      name: "Product",
      cell: (row) => row.cartItems[0].product.productName, // Access product name
      sortable: true,
    },
    {
      name: "Shipping Address",
      cell: (row) => row.shippingAddress.fullName, // Access fullName from shippingAddress
    },
    {
      name: "Product Category",
      cell: (row) => row.cartItems[0].product.subcategoryId.name, // Access subcategory name
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Order Date",
      selector: (row) => formatDateForInput(row.orderDate),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="text-primary">
          <FaDownload size={18} onClick={() => handleDownloadClick(row)} />
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
          <input type="date" className="ms-3" />
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="fs-5">
            Data refresh{" "}
            <span className="text-primary">
              <FiRefreshCw size={20} />
            </span>
          </div>
          <div className="bg-secondary text-white p-2 rounded">
            September 23, 2023 15:12 PM
          </div>
        </div>
      </div>
      <div className="shadow mt-4">
        <DataTable
          title="Orders"
          columns={columns}
          data={ordersData}
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
