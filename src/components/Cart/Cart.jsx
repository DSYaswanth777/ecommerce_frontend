import React from "react";
import { Button, CardBody, Input, Badge } from "reactstrap";
import Logo from "../../assets/images/dress_materials.png";
import { formatCurrency } from "../../utilities/formatCurrency";
function Cart() {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="px-2">
          <CardBody className="">
            <div className="d-flex gap-4 justify-content-center align-items-center py-3">
              <img src={Logo} alt="" width={120} height={120} />
              <div className="d-flex flex-column justify-content-start  gap-3 align-items-start ">
                <h6>Shiffon Cotton Saree With Floral Print</h6>
                <Badge
                  style={{ backgroundColor: "#2D7B8B" }}
                  color="bg-success"
                >
                  In Stock
                </Badge>
                <div className="d-flex gap-3">
                  <Button
                    className="btn-sm fw-bold"
                    style={{ backgroundColor: "#2D7B8B" }}
                  >
                    -
                  </Button>
                  <Input
                    className=""
                    value={2}
                    style={{ width: "40px", height: "30px" }}
                  ></Input>
                  <Button
                    className="btn-sm fw-bold"
                    style={{ backgroundColor: "#2D7B8B" }}
                  >
                    +
                  </Button>
                </div>
                <div>
                  {" "}
                  <span className="pe-2 fs-5 fw-medium">Price:</span>{" "}
                  {formatCurrency("500")}
                </div>
              </div>
            </div>
          </CardBody>
        </div>
        <hr />
        <div className="d-flex gap-2 pb-3">
          <h5>SubTotal:</h5> <h5>{formatCurrency("2500")}</h5>
        </div>
        <div className="d-flex flex-column gap-3">
          <Button style={{ backgroundColor: "#2D7B8B" }}>
            {" "}
            <a href="/checkoutcart" className="text-white ">
              View Cart
            </a>
          </Button>
          <Button style={{ backgroundColor: "#2D7B8B" }}>
            Proceed To CheckOut
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
