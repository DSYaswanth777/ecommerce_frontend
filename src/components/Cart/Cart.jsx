import React from "react";
import { Button, CardBody, Input } from "reactstrap";
import Logo from "../../assets/icons/brand_logo.svg";
import { formatCurrency } from "../../utilities/formatCurrency";
function Cart() {

  return (
    <>
      <div className="d-flex flex-column">
        <div className="p-3">
          <CardBody className="border-bottom border-2">
            <div className="d-fle gap-2">
              <div className="d-flex gap-4 justify-content-around align-items-center">
                <img src={Logo} alt="" width={120} height={120} />
                <h6>Apple Iphone 6</h6>
              </div>
              <div className="d-flex justify-content-around pb-3 align-items-center ">
                <Button className="btn-sm">-</Button>
                <Input className="" value={2} style={{ width: "40px" ,height:"30px"}}></Input>
                <Button className="btn-sm">+</Button>
                <div>{formatCurrency("500")}</div>
              </div>
            </div>
          </CardBody>
          <CardBody className="border-bottom border-2">
            <div className="d-fle gap-2">
              <div className="d-flex gap-4 justify-content-around align-items-center">
                <img src={Logo} alt="" width={120} height={120} />
                <h6>Apple Iphone 6</h6>
              </div>
              <div className="d-flex justify-content-around pb-3 align-items-center ">
                <Button className="btn-sm">-</Button>
                <Input className="" value={2} style={{ width: "40px" ,height:"30px"}}></Input>
                <Button className="btn-sm">+</Button>
                <div>{formatCurrency("500")}</div>
              </div>
            </div>
          </CardBody>
          <CardBody className="border-bottom border-2">
            <div className="d-fle gap-2">
              <div className="d-flex gap-4 justify-content-around align-items-center">
                <img src={Logo} alt="" width={120} height={120} />
                <h6>Apple Iphone 6</h6>
              </div>
              <div className="d-flex justify-content-around pb-3 align-items-center ">
                <Button className="btn-sm">-</Button>
                <Input className="" value={2} style={{ width: "40px" ,height:"30px"}}></Input>
                <Button className="btn-sm">+</Button>
                <div>{formatCurrency("500")}</div>
              </div>
            </div>
          </CardBody>
        </div>
        <div className="d-flex gap-2 pb-3">
          <h5>SubTotal:</h5> <h5>{formatCurrency("2500")}</h5>
        </div>
        <div className="d-flex flex-column gap-3">
          <Button> <a href="/checkoutcart" className="text-white ">View Cart</a></Button>
          <Button>Proceed To CheckOut</Button>
        </div>
      </div>
    </>
  );
}

export default Cart;
