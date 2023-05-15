import React from "react";
import { ReactSVG } from "react-svg";
import TestimonialCardStyleSix from "~components/lib/Card/TestimonialCardStyleSix";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import data from "./data"
const Testimonial = () => {
  return (
    <div className="testimonial-section-08">
      <div
        className="testimonial-section-08__dots"
        data-aos="fade-right"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <ReactSVG
          src="./image/home-9/dots.svg"
          className="react-svg-w-100"
          alt="shape"
        />
      </div>
      <div className="container">
        <div className="section-title testimonial-section-08__title text-center">
          <h6 className="subtitle text-blue mb-20">Testimonial</h6>
          <h2 className="title">What our happy clients say</h2>
        </div>
        <ThreeColSlider className="row testimonial-section-08__slider three-row-mobile-slider mobile-slider">
          {data.map(({position,text,image,rating,userName},index)=>{
            return(
              <div className="col-xl-4 col-lg-4 col-md-6" key={index + "l9ts"}>
                  <TestimonialCardStyleSix position={position} text={text} image={image} rating={rating} userName={userName}/>
              </div>
            )
          })}
        </ThreeColSlider>
      </div>
    </div>
  );
};
export default Testimonial;