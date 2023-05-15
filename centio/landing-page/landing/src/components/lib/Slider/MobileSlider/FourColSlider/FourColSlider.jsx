import React, { useRef } from "react";
import Slider from "react-slick";
import { FourColSliderConfig } from "~data/sliderConfig";

const FourColSlider = ({ children,sliderConfig= FourColSliderConfig,className }) => {
  const elSlider = useRef();
  return (
    <Slider 
    className={`row-xl mobile-slider four-row-mobile-slider ${className}`}
    ref={elSlider}
    {...sliderConfig}>
      {children}
    </Slider>
  );
};

export default FourColSlider;
