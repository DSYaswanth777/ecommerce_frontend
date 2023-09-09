import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import {
  BsInstagram,
  BsYoutube,
  BsWhatsapp,
  BsFacebook,
} from "react-icons/bs";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="bg-light pt-5 pb-5">
      <div className="container">
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <div className="d-flex flex-column gap-2">
            <h5 className="fw-bold">NEWSLETTER SUBSCRIPTION</h5>
            <p>
              Sign up for GSR Handlooms updates to receive information about new arrivals and updates!
            </p>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-sm-2 gap-2">
            <InputGroup className="rounded border">
              <Input
                type="search"
                placeholder="Enter Your Email"
                className="rounded"
              />
            </InputGroup>
            <Button className="btn-subscribe">Subscribe!</Button>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between pt-4 flex-column flex-sm-row">
          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading">Useful Links</h5>
            <ul className="list-unstyled ">
              <li>Track Order</li>
              <li>Return & Exchange</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Our Store</li>
            </ul>
          </div>

          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading">Policies</h5>
            <ul className="list-unstyled">
              <li>Shipping</li>
              <li>Terms</li>
              <li>Return/ Replace</li>
              <li>Refund</li>
              <li>Privacy</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading">GSR Handlooms</h5>
            <p>
              <span className="fw-bold">Manufacturer Details:</span> GSR Handlooms
              <br />
              <span className="fw-bold">Country Of Origin:</span> India <br />
              <span className="fw-bold">Address:</span> Jakka Vari Street, Perala, Chirala, Andhra Pradesh <br />
              <span className="fw-bold">E-Mail ID:</span> gsrhandlooms@gmail.com <br />
              All prices are MRPs inclusive of taxes.
            </p>
          </div>

          <div className="footer-section col-lg-3 col-md-6 mt-md-4 mt-4 mt-sm-4 mt-lg-0 col-sm-12">
            <h5 className="footer-list-heading text-center">Follow US</h5>
            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0">
                <BsFacebook size={20} className="me-2" /> Facebook
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0">
                <BsInstagram size={18} className="me-2" /> Instagram
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0">
                <BsYoutube size={20} className="me-2" /> Youtube
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <p className="mb-0">
                <BsWhatsapp size={18} className="me-2" /> What's App
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
