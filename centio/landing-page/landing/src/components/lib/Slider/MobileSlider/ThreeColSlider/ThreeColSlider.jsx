import React, { useRef } from "react";
import Slider from "react-slick";
import { threeColSliderConfig } from "~data/sliderConfig";

const sliderConfigDeault = threeColSliderConfig;
const ThreeColSlider = ({
  children,
  sliderConfig = sliderConfigDeault,
  className,
}) => {
  const elSlider = useRef();
  return (
    <Slider
      className={`row mobile-slider three-row-mobile-slider ${className}`}
      ref={elSlider}
      {...sliderConfig}
    >
      {children}
    </Slider>
  );
};

export default ThreeColSlider;
