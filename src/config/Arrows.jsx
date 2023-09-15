import React from "react";
import "./arrows.scss";
export const NextArrow = (props) => {
  return (
    <>
      <div className="arrow">
        <div
          className={props.className}
          style={{
            ...props.style,
            backgroundColor: "black",
            position: "static",
          }}
          onClick={props.onClick}
        />
      </div>
    </>
  );
};

export const PrevArrow = (props) => {
  return (
    <>
      <div className="arrow">
        <div
          className={props.className}
          style={{
            ...props.style,
            backgroundColor: "black",
            position: "static",
            bottom:"100px",
          }}
          onClick={props.onClick}
        />
      </div>
    </>
  );
};
