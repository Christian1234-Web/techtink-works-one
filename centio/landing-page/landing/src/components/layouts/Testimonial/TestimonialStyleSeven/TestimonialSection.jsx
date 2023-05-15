import React from "react";
import TestimonialCardFive from "~components/lib/Card/TestimonialStyleCardFive";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import data from "./data";
const Testimonial = () => {
  return (
    <div className="testimonil-section-06">
      <div className="testimonil-section-06__circle-1 particle"></div>
      <div className="testimonil-section-06__circle-2 particle"></div>
      <div className="testimonil-section-06__circle-1 particle"></div>
      <div className="testimonil-section-06__circle-2 particle"></div>
      <div className="container">
        <div className="row">
          <div className="section-title testimonil-section-06__title">
            <h6 className="subtitle text-secondary">Testimonials</h6>
            <h2 className="title">Review from our customers</h2>
          </div>
        </div>
        <ThreeColSlider className="row three-row-mobile-slider mobile-slider">
          {data.map(({ image, userName, position, text, id }) => {
            return (
              <div className="col-lg-4" key={id}>
                <TestimonialCardFive
                  image={image}
                  userName={userName}
                  position={position}
                  text={text}
                />
              </div>
            );
          })}
        </ThreeColSlider>
      </div>
    </div>
  );
};
export default Testimonial;
