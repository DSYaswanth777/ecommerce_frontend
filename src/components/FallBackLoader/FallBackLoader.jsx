import React from "react";
import Logo from "../../assets/icons/brand_logo.svg";
import { Loader } from "react-feather";
import { Spinner } from "reactstrap";
import "./FallBackLoader.scss";
function FallBackLoader() {
  return (
    <div className="loader_container">
        <div className="d-flex flex-column justify-content-center align-items-center">

      <img src={Logo} alt="" className="logo" />
        </div>
      <div className="loader"></div>
      {/* <div className="loader"></div>
      <div className="loader"></div>
      <div className="loader"></div> */}
      {/* <div className="loader"></div> */}
    </div>
  );
}

export default FallBackLoader;
