import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import Slider from "react-slick";
import DataDefault from "./data";
const PortfolioSlider = ({ data = DataDefault }) => {
  const elSlider = useRef();
  const sliderConfig = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };
  return (
    <>
      <Slider ref={elSlider} {...sliderConfig}>
        {data.map(({ src, id }, index) => {
          return (
            <div
              className="protfoliocontent-section-02__slider--single"
              key={id + index}
            >
              <img src={src} alt="portfolio" />
            </div>
          );
        })}
      </Slider>
      <div className="portfolio-details-slider--01__control-buttons">
        <button
          className="button button--prev"
          onClick={() => elSlider.current.slickPrev()}
        >
          <ReactSVG
            src="./image/portfolio/slider-arrow-1.svg"
            className="svg-image react-shape-h-100 react-shape-w-100 icon-d-block"
          />
        </button>
        <button
          className="button button--next"
          onClick={() => elSlider.current.slickNext()}
        >
          <ReactSVG
            src="./image/portfolio/slider-arrow-2.svg"
            className="svg-image react-shape-h-100 react-shape-w-100 icon-d-block"
          />
        </button>
      </div>
    </>
  );
};

export default PortfolioSlider;
