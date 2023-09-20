import React, { useState } from "react";
import { ShoppingBag, ShoppingCart } from "react-feather";
import Header from "../Header/Header";
import CartStep from "./Steps/cartStep";
import Footer from "../Footer/Footer";
import "./CheckOutCard.scss";
import AddressStep from "./Steps/AddressStep";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { LiaGreaterThanSolid } from "react-icons/lia";

function CheckOutCart() {
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(activeStep + 1)?.();
  };

  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1)?.();
  };
  const steps = [
    {
      id: "cart",
      title: "Cart",
      subtitle: "Your Cart Items",
      icon: <ShoppingCart size={18} />,
      content: (
        <CartStep
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      ),
    },
    {
      id: "shipping",
      title: "Shipping",
      subtitle: "Shipping Information",
      icon: <ShoppingBag size={18} />,
      content: (
        <div>
          <AddressStep />
        </div>
      ),
    },
  ];

  return (
    <div className=" ">
      <Header />
      <h2 className=" py-3 text-center ">Checkout</h2>
      <div className="d-flex justify-content-center gap-3 align-items-center container">

          <button className="btn-success btn text-white p-2 rounded "
                    onClick={handlePreviousStep}
                    disabled={activeStep === 0}
          >
            <AiOutlineShoppingCart size={30} />
          </button>
          <div className="">
            <h4>Cart</h4>
          </div>

        <div className="text-success fs-3">
          --------------------------------------------------
        </div>
        <button
          className="btn btn-success"
          onClick={handleNextStep}
          disabled={activeStep === steps.length - 1}
        >
          <AiOutlineHome size={25} />
        </button>
        <h4>Address</h4>
      </div>
      {steps[activeStep].content}
      <Footer />
    </div>
  );
}

export default CheckOutCart;
