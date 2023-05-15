import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import Slider from "react-slick";
import TestimonialCardThree from "~components/lib/Card/TestimonialCardStyleThree";
import DataDefault from "./data";
const TestimonialSlider = ({ data = DataDefault }) => {
  const elSlider = useRef();
  const sliderConfig = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots:true,
        },
      },
    ],
  };
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-xs-11 col-md-9 col-lg-12">
          <div className="testimonil-section-04__slider">
            <Slider
              ref={elSlider}
              className="testimonial-slider--04 slider-minimal slider-dots-style-one"
              {...sliderConfig}
            >
              {data.map(({ image, text, name, position, id }) => {
                return (
                  <TestimonialCardThree
                    image={image}
                    text={text}
                    name={name}
                    position={position}
                    key={id}
                  />
                );
              })}
            </Slider>
            <div className="testimonial-slider--04__control-buttons">
              <button
                className="button button--prev"
                onClick={() => elSlider.current.slickPrev()}
              >
                <ReactSVG
                  src="./image/home-4/left.svg"
                  className="slick-svg-icon"
                />
              </button>
              <button
                className="button button--next"
                onClick={() => elSlider.current.slickNext()}
              >
                <ReactSVG
                  src="./image/home-4/right.svg"
                  className="slick-svg-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialSlider;
