import React from "react";
import TestimonialCardStyleFour from "~components/lib/Card/TestimonialCardStyleFour";
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
    <div className="testimonil-section-05">
      <div className="container">
        <div className="section-title content-title text-center">
          <h6 className="subtitle text-secondary mb-20">Testimonial</h6>
          <h2 className="title">What our happy clients say</h2>
        </div>
        <div className="row justify-content-center">
          <div
            className="col-xl-3 col-lg-3 col-sm-5 col-8 order-1 order-lg-1 d-none d-lg-block"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="testimonil-section-05__image-group-1">
              <img
                src="./image/home-6/left-client.png"
                className="w-100"
                alt="client"
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 order-4 order-lg-2">
            <SlickSlider
              sliderConfig={sliderConfigDefault}
              className="testimonil-slider--06 testimonil-section-05__slider mobile-slider"
            >
              <TestimonialCardStyleFour
                quoteIcon={false}
                image="./image/home-6/testimonial-1.png"
                name="Mila McSabbu"
                position="Digital Marketer"
                text="OMG! I cannot believe that I have got a brand new landing page after getting appmax. It was super easy to  edit and publish. "
              />

              <TestimonialCardStyleFour
                quoteIcon={false}
                image="./image/home-6/t-client.png"
                name="Jenny Wilson"
                position="Web Developer"
                text="OMG! I cannot believe that I have got a brand new landing page after getting appmax. It was super easy to  edit and publish. "
              />

              <TestimonialCardStyleFour
                quoteIcon={false}
                image="./image/home-6/testimonial-2.png"
                name="Robert Fox"
                position="Founder, Oppora"
                text="OMG! I cannot believe that I have got a brand new landing page after getting appmax. It was super easy to  edit and publish. "
              />
            </SlickSlider>
          </div>
          <div
            className="col-xl-3 col-lg-3 col-sm-5 col-8 order-2 order-lg-3  d-none d-lg-block"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="testimonil-section-05__image-group-2">
              <img
                src="./image/home-6/right-client.png"
                className="w-100"
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;