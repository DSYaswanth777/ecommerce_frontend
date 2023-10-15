import React from "react";
import "./Header.scss"
function SearchResults({ products }) {
  return (
    <div className="search-results bg-white">
      {products?.slice(0, 5)?.map((product) => (
        <p key={product._id}>{product?.name}</p>
      ))}
    </div>
  );
}

export default SearchResults;
