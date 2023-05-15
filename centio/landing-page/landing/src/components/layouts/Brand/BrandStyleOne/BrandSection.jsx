import React from "react";
import brands  from "./data";
const BrandSection = ({data = brands}) => {
  return (
    <div className="brand-section-01">
      <div className="container">
        <div className="brand-section-01__wrapper">
          {data.map(({src,id},index) => {
              return(
                <div className="single-brand" key={id + index}>
                    <img src={src} alt="brand" />
                </div>
              )
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
