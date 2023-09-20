import React from "react";
import ProductImg from "../../assets/images/image.jpg";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Button, Card, CardBody } from "reactstrap";
import "./Products.scss"
function Products() {
  return (
    <div>
      <div className="productsGrid pt-4">
        <div className="d-flex flex-column ">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className=" border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
        <div className="d-flex flex-column">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className="border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
        <div className="d-flex flex-column ">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className="border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
        <div className="d-flex flex-column ">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className=" border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
        <div className="d-flex flex-column">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className="border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
        <div className="d-flex flex-column ">
          <img src={ProductImg} alt="" className="productImg"  />
          <h6 className="pt-3">Sinful Burgundy Chiffon with Gold Border</h6>
          <p>MRP {formatCurrency("1050")}</p>
          <p
            className="border p-1 rounded border-dark"
            style={{ width: "fit-content" }}
          >
            One size
          </p>
          <Button className="" style={{ width: "fit-content" }}>
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Products;
