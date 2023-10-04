import React from "react";
import { BsInstagram, BsYoutube, BsWhatsapp, BsFacebook } from "react-icons/bs";
import Dev from "../../assets/icons/favicon.svg";
import Logo from "../../assets/icons/brand_logo.svg"
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-light pt-5 pb-5 footer">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between pt-4 flex-column flex-sm-row">
          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading text-uppercase">Useful Links</h5>
        <hr/> 

            <ul className="list-unstyled ">
              <li>Track Order</li>
              <li>Return & Exchange</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Our Store</li>
            </ul>
          </div>
          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading text-uppercase">Policies</h5>
          <hr/>

            <ul className="list-unstyled">
              <li>Shipping</li>
              <li>Terms</li>
              <li>Return/ Replace</li>
              <li>Refund</li>
              <li>Privacy</li>
              <li>FAQs</li>
            </ul>
          </div>
          <hr/>
          <div className=" col-lg-3 col-md-6  col-sm-12">
            <div className="text-center pb-3">

            <img src={Logo} alt="" />
            </div>
            <p>
              <span className="fw-bold">Manufacturer Details:</span> GSR
              Handlooms
              <br />
              <span className="fw-bold">Country Of Origin:</span> India <br />
              <span className="fw-bold">Address:</span> Jakka Vari Street,
              Perala, Chirala, Andhra Pradesh <br />
              <span className="fw-bold">
                E-Mail ID:
              </span> gsrhandlooms@gmail.com <br />
              All prices are MRPs inclusive of taxes.
            </p>
          </div>
          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading text-uppercase text-center">Follow US</h5>
          <hr/>

            <div className="d-flex  justify-content-center gap-3 align-items-center pt-3">
              <BsFacebook size={25} className="me-2" />
              <BsInstagram size={25} className="me-2" />{" "}
              <BsYoutube size={25} className="me-2" />
              <BsWhatsapp size={25} className="me-2" />{" "}
            </div>
            <div className="pt-4 d-flex flex-column justify-content-center align-items-center">
              <p className="text-center fw-medium">Desgined and Developed By </p>
              <div>

              <img src={Dev} alt=""  /> <a href="https://www.yaswanthdasari.in/" className="list-style-none text-dark">Yaswanth Dasari</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
