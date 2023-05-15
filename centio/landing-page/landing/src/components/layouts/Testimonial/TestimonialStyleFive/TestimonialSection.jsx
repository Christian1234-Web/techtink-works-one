import React from "react";
import TestimonialCardFour from "~components/lib/Card/TestimonialCardStyleFour";
import SlickSlider from "~components/lib/Slider/SlickSlider";
const sliderConfigDefault = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};
const Testimonial = () => {
  return (
    <div className="testimonil-section-10">
      <div className="container">
        <div className="section-title content-title text-center">
          <h6 className="subtitle text-grren mb-20">Testimonial</h6>
          <h2 className="title">
            What our students are saying <br className="d-none d-xs-block" />
            about Custer
          </h2>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-3 offset-xl-1 col-lg-6 col-md-9 col-sm-10 col-xs-11">
            <div
              className="testimonil-section-10__image-group d-none d-lg-block"
              data-aos="zoom-in"
              data-aos-duration={800}
            >
              <img
                src="./image/home-5/testimonil.png"
                alt="testimonil-image"
                className="w-100"
              />
            </div>
          </div>
          <div
            className="col-xl-6 offset-xl-1 col-lg-6 col-md-9 col-sm-10 col-xs-11"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <SlickSlider
              sliderConfig={sliderConfigDefault}
              className="testimonil-slider--02 mobile-slider"
            >
              <TestimonialCardFour
                image="./image/home-6/testimonial-1.png"
                name="Mila McSabbu"
                position="Digital Marketer"
                text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
              />

              <TestimonialCardFour
                image="./image/home-6/t-client.png"
                name="Jenny Wilson"
                position="Web Developer"
                text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
              />

              <TestimonialCardFour
                image="./image/home-6/testimonial-2.png"
                name="Robert Fox"
                position="Founder, Oppora"
                text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
              />
            </SlickSlider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
