import React, { useEffect, useState } from "react";
import "./Categories.scss";
const brakePoints = [350, 500, 750];
const imgId = [1011, 883, 1074, 823, 64, 65, 839, 314, 256, 316, 92, 643];

const generateImageUrls = () => {
  const images = [];
  for (let i = 0; i < imgId.length; i++) {
    const ih = 200 + Math.floor(Math.random() * 10) * 15;
    images.push(`https://unsplash.it/250/${ih}?image=${imgId[i]}`);
  }
  return images;
};

const Categories = () => {
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    setImages(generateImageUrls());

    const getColumns = (w) => {
      return (
        brakePoints.reduceRight((p, c, i) => {
          return c < w ? p : i;
        }, brakePoints.length) + 1
      );
    };

    const onResize = () => {
      const newColumns = getColumns(window.innerWidth);
      if (newColumns !== columns) {
        setColumns(newColumns);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [columns]);

  const mapChildren = () => {
    const numC = columns;
    const col = [];
    for (let i = 0; i < numC; i++) {
      col.push([]);
    }

    return images.reduce((p, c, i) => {
      p[i % numC].push(<Tile key={i} src={c} />);
      return p;
    }, col);
  };

  return (
    <div className="container">
      <div className="masonry-container">
        <div className="masonry" ref={null}>
          {mapChildren().map((col, ci) => (
            <div className="column" key={ci}>
              {col.map((child, i) => (
                <div key={i}>{child}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const Tile = ({ src }) => {
  return (
    <div className="tile">
      <img src={src} alt="" />
    </div>
  );
};
export default Categories;
