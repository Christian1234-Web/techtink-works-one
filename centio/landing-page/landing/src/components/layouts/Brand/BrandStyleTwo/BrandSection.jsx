import React from "react";
import brands from "./data";
const BrandSection = ({ data = brands, className }) => {
  return (
    <div className={`brand-section-02 ${className}`}>
      <div className="container">
        <div className="brand-section-02__wrapper">
          {data.map(({ src, id }, index) => {
            return (
              <div className="single-brand" key={id + index}>
                <img src={src} alt="brand" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
