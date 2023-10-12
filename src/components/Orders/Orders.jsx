import React from "react";
import Header from "../Header/Header";
import {
  Button,
  Card,
  CardBody, Input
} from "reactstrap";
import ProductImg from "../../assets/images/image.jpg";
import { formatCurrency } from "../../utilities/formatCurrency";
function Orders() {

  return (
    <div>
      <Header />
      <div className="d-flex container flex-column gap-2 pt-5">
        <div className="d-flex">
          <Input className="w-100 me-3" placeholder="Search for Your Order" />
          <Button>Search</Button>
        </div>


        <div className="d-flex flex-column ">
          <Card className="mt-3">
            <CardBody>
              <div className="d-flex flex-column flex-sm-row gap-5 justify-content-between align-items-center">
                <img src={ProductImg} alt="" width={200} height={200} />
                <h6>Shiffon Red Saree</h6>
                <h5>{formatCurrency("1500")}</h5>
                <div className="d-flex flex-column">
                  <h6>Deliverd on Jul 19</h6>
                  <p>Your item has been Delivered</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Orders;
