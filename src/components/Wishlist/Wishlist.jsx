import React from "react";
import Header from "../Header/Header";
import { Card, CardBody, CardTitle } from "reactstrap";
import ProductImg from "../../assets/images/image.jpg";
import { formatCurrency } from "../../utilities/formatCurrency";
import {FiTrash2} from "react-icons/fi"
function Wishlist() {
  return (
    <div>
      <Header />
      <div className="pt-5 container ">
        <Card className="py-4 w-50">
          <CardTitle className="ms-5 fs-5 fw-bold">My Wishlist(25)</CardTitle>
          <hr />
          <CardBody>
            <div className="d-flex justify-content-between">
              <img src={ProductImg} alt="" width={250} height={200} />
              <div className="d-flex flex-column">
                <h6>Blue Cotton Saree</h6>
                <h6>{formatCurrency("2500")}</h6>
              </div>
            <FiTrash2 className='text-danger'/>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Wishlist;
