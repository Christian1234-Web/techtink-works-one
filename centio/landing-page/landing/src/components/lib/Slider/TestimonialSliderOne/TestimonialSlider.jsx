import React, { useRef } from "react";
import { ReactSVG } from 'react-svg'
import Slider from "react-slick";
import TestimonialSlide from "./TestimonialSingleSlide";
import DataDefault from "./data"
const TestimonialSlider = ({data=DataDefault}) => {
  const elSlider = useRef();
  const sliderConfig = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  }
  return (
    <>
      <Slider
        ref={elSlider}
        {...sliderConfig}
      >
          {data.map(({text,name,position,id})=>{
              return(
                <TestimonialSlide text={text} name={name} position={position} key={id}/>
              )
          })}
      </Slider>
      <div className="testimonil-slider--01__control-buttons">
        <button className="button button--prev"  onClick={() => elSlider.current.slickPrev()}>
          <ReactSVG src="./image/home-1/arrow-left.svg" className="svg-image" />
        </button>
        <button className="button button--next" onClick={() => elSlider.current.slickNext()}>
          <ReactSVG
            src="./image/home-1/arrow-right.svg"
            className="svg-image"
          />
        </button>
      </div>
    </>
  );
};

export default TestimonialSlider;
