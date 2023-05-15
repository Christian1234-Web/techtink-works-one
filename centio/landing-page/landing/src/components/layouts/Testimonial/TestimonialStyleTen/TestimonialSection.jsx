import React from "react";
import TestimonialCardStyleSeven from "~components/lib/Card/TestimonialCardStyleSeven";
import SlickSlider from "~components/lib/Slider/SlickSlider";
import data from "./data";
const sliderConfigDefault = {
  dots: true,
  infinite: true,
  autoplay: false,
  speed: 800,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};
const Testimonial = () => {
  return (
    <div className="testimonial-section-09">
      <div className="container">
        <div className="section-title testimonial-section-09__title text-center">
          <h6 className="subtitle text-secondary mb-20">Testimonial</h6>
          <h2 className="title">
            We are happy to share our <br className="d-none d-xs-block" />{" "}
            client’s review
          </h2>
        </div>
        <SlickSlider
          sliderConfig={sliderConfigDefault}
          className="testimonial-section-09__slider testimonial-section-09--02 testimonial-slider--05 mobile-slider"
        >
          {data.map(({ image, userName, position, rating, text }, index) => {
            return (
              <TestimonialCardStyleSeven
                image={image}
                userName={userName}
                position={position}
                text={text}
                rating={rating}
                key={index + "tsml10"}
              />
            );
          })}
        </SlickSlider>
      </div>
    </div>
  );
};
export default Testimonial;
