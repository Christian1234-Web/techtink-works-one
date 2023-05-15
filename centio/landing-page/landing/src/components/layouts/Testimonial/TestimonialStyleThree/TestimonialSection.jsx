import React from "react";
import TestimonialCardTwo from "~components/lib/Card/TestimonialCardStyleTwo";
import SlickSlider from "~components/lib/Slider/SlickSlider/SlickSlider";
import data from "./data";
const sliderConfig = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 800,
      slidesToShow: 3,
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
      ]
}


const Testimonial = () => {
  return (
    <div className="testimonil-section-03">
      <div className="container">
        <div className="row">
          <div className="section-title testimonil-section-03__title">
            <h2 className="title">
              Positive reviews from <br className="d-none d-sm-block" /> 22k+
              happy customers
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
        <div className="col-xs-11 col-md-9 col-xs-11 col-lg-12">
        <SlickSlider sliderConfig={sliderConfig} className="slider-dots-style-one slider-minimal">
          {data.map(({image,position,id,name,text},index)=>{return(
            <div className="col-xl-4 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 * index} data-aos-duration="1000" key={id + "tm"}>
               <TestimonialCardTwo name={name} text={text} image={image} position={position}/>
            </div>
          )})}
        </SlickSlider>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
