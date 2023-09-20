import React, { useState } from "react";
import { Badge, Button, Card, CardBody, CardTitle, Input } from "reactstrap";
import ProductImg from "../../../assets/images/image.jpg";
import { formatCurrency } from "../../../utilities/formatCurrency";
function CartStep({ handlePreviousStep, handleNextStep }) {
  return (
    <>
      <div className="d-flex container justify-content-between pt-5 flex-column flex-lg-row flex-md-column flex gap-5   pb-5">
        <div className="d-flex flex-column   gap-3 pb-5">
          <Card className=" shadow p-3 h-100 w-100">
            <CardBody>
              <div className="d-flex justify-content-between flex-column flex-sm-row gap-5 align-items-center">
                <img src={ProductImg} alt="" width={200} height={200} />
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <div className="productName text-center">
                    Posh Wine with Bronze Lace <br /> and Self Blouse Fabric
                  </div>
                  <h5>
                    <Badge>InStock</Badge>
                  </h5>
                  <div className="d-flex justify-content-around align-items-center gap-3">
                    <Button className="btn-sm">-</Button>
                    <Input
                      className=""
                      value={2}
                      style={{ width: "40px", height: "30px" }}
                    ></Input>
                    <Button className="btn-sm">+</Button>
                  </div>
                </div>
                <div className="d-flex flex-column gap-3 justify-content-center ">
                  <h5 className="productPrice">
                    {" "}
                    <span className="me-2">Total :</span>
                    {formatCurrency("2500")}
                  </h5>

                  <Button className="bg-danger">Remove</Button>
                  <Button className="bg-warning">Add to Wishlist</Button>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className=" shadow p-3 h-100">
            <CardBody>
              <div className="d-flex justify-content-between flex-column flex-sm-row gap-5 align-items-center">
                <img src={ProductImg} alt="" width={200} height={200} />
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <div className="productName text-center">
                    Posh Wine with Bronze Lace <br /> and Self Blouse Fabric
                  </div>
                  <h5>
                    <Badge>InStock</Badge>
                  </h5>
                  <div className="d-flex justify-content-around align-items-center gap-3">
                    <Button className="btn-sm">-</Button>
                    <Input
                      className=""
                      value={2}
                      style={{ width: "40px", height: "30px" }}
                    ></Input>
                    <Button className="btn-sm">+</Button>
                  </div>
                </div>
                <div className="d-flex flex-column gap-3 justify-content-center ">
                  <h5 className="productPrice">
                    {" "}
                    <span className="me-2">Total :</span>
                    {formatCurrency("2500")}
                  </h5>
                  <Button className="bg-danger">Remove</Button>
                  <Button className="bg-warning">Add to Wishlist</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <Card className="bg-light py-4 w-100 ">
            <CardTitle className="px-3 ">Cart Total</CardTitle>
            <CardBody className="totalCard">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Coupons</div>
                  <div className="text-primary">Apply</div>
                </div>
                <h6 className="fw-bold pt-2">Price Details</h6>
                <div className="d-flex justify-content-between gap-5  align-items-center">
                  <div>Total MRP</div>
                  <div className="">{formatCurrency("2500")}</div>
                </div>
                <div className="d-flex justify-content-between gap-5 align-items-center">
                  <div>Bag Discount</div>
                  <div className="">{formatCurrency("2500")}</div>
                </div>
                <div className="d-flex justify-content-between gap-5 align-items-center">
                  <div>Estimated Tax</div>
                  <div className="">{formatCurrency("2500")}</div>
                </div>
                <div className="d-flex justify-content-between gap-5 align-items-center">
                  <div>Delivery Charges</div>
                  <div className="">{formatCurrency("2500")}</div>
                </div>
                <hr />
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>Total</div>
                    <div className="">{formatCurrency("2500")}</div>
                  </div>
                  <Button onClick={handleNextStep}>Place Order</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}

export default CartStep;
