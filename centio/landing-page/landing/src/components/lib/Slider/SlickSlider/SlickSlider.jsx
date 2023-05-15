import React, { useRef } from "react";
import Slider from "react-slick";

const SlickSlider = ({ children,sliderConfig,className,refTarget }) => {
  const elSlider = useRef();
  return (
    <Slider 
    className={className}
    ref={refTarget ? refTarget : elSlider}
    {...sliderConfig}
    >
      {children}
    </Slider>
  );
};

export default SlickSlider;
