import React, { useState } from "react";
import Header from "../Header/Header";
import OrdersFilter from "./OrderFilter";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input
} from "reactstrap";
import ProductImg from "../../assets/images/image.jpg";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Filter } from "react-feather";
function Orders() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <Header />
      <div className="d-flex container flex-column gap-2 pt-5">
        <div className="d-flex">
          <Input className="w-100 me-3" placeholder="Search for Your Order" />
          <Button>Search</Button>
        </div>
        <div className="d-flex  justify-content-between pt-3">
          <Button onClick={toggleMenu}>
            {" "}
           <Filter/><span>Filters</span>
          </Button>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Sort By</DropdownToggle>
            <DropdownMenu className="mt-2">
              <DropdownItem defaultChecked>Featured</DropdownItem>
              <DropdownItem>Low to High</DropdownItem>
              <DropdownItem>High to Low</DropdownItem>
              <DropdownItem>Newest First</DropdownItem>
              <DropdownItem>Oldest First</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      <OrdersFilter isOpen={menuOpen} toggleMenu={toggleMenu}/>
    </div>
  );
}

export default Orders;
