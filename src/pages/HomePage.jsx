import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Footer from "../components/Footer/Footer";
import Poster from "../components/Poster/Poster";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  recentProductAsync,
  sortproductsAsync,
} from "../redux/slice/productSlice";
import { Shimmer } from "react-shimmer";
import { Card } from "reactstrap";

function Home() {
  const recentProducts = useSelector((state) => state.products?.recentproducts);
  const filteredProducts = useSelector(
    (state) => state.products?.sortedproducts
  );
  const status = useSelector((state) => state.products?.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(recentProductAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(sortproductsAsync("lowtohigh"));
    }
  }, [status, dispatch]);

  return (
    <div>
      <Header />
      <HeroSection />
      {status === "loading" ? (
        <div className="container pt-5">
          <h4 className="text-center title">Just In</h4>
          <h2 className="text-center mb-5 subtitle">New Arrivals for You</h2>
          <div className="d-flex gap-4">
            {recentProducts?.length > 0 ? (
              recentProducts?.map((product) => (
                <div className="d-flex " key={product._id}>
                  <Shimmer
                    key={product._id}
                    visible={true}
                    autoRun={true}
                    width={400}
                    height={400}
                  >
                    <Card
                      className="slider-content"
                      style={{ width: "18rem" }}
                    ></Card>
                  </Shimmer>
                </div>
              ))
            ) : (
              <Shimmer visible={true} autoRun={true} width={400} height={400}>
                <Card
                  className="slider-content"
                  style={{ width: "18rem" }}
                ></Card>
              </Shimmer>
            )}
          </div>
        </div>
      ) : (
        <Poster
          title="Just In"
          subtitle="New Arrivals for You"
          products={recentProducts}
        />
      )}
      {status === "loading" ? (
        <div className="container pt-5">
          <h4 className="text-center title">Best Deals Await</h4>
          <h2 className="text-center mb-5 subtitle">
            Discover Affordable Finds: Prices Low to High
          </h2>
          <div className="d-flex gap-4">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div className="d-flex ">
                  <Shimmer
                    key={product._id}
                    visible={true}
                    autoRun={true}
                    width={400}
                    height={400}
                  >
                    <Card
                      className="slider-content"
                      style={{ width: "18rem" }}
                    ></Card>
                  </Shimmer>
                </div>
              ))
            ) : (
              <Shimmer visible={true} autoRun={true} width={400} height={400}>
                <Card
                  className="slider-content"
                  style={{ width: "18rem" }}
                ></Card>
              </Shimmer>
            )}
          </div>
        </div>
      ) : (
        <Poster
          title="Best Deals Await"
          subtitle="Discover Affordable Finds: Prices Low to High"
          products={filteredProducts}
        />
      )}
      <Footer />
    </div>
  );
}

export default Home;
