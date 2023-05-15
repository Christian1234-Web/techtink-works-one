import React from "react";
import { ReactSVG } from "react-svg";
export default function PortfolioCard({ image, title, tag, ...rest }) {
  return (
    <a href="#" className="portfolio-card">
      <img src={image} alt="portfolio" className="w-100" />
      <div className="icon">
        <ReactSVG src={"./image/portfolio/plus-icon.svg"} alt="plus-icon" />
      </div>
      <div className="content">
        <h6>{title}</h6>
        <span>{tag}</span>
      </div>
    </a>
  );
}
