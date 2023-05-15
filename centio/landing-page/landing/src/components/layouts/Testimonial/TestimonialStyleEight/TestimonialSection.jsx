import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import TestimonialCardFour from "~components/lib/Card/TestimonialCardStyleFour";
import SlickSlider from "~components/lib/Slider/SlickSlider";
const sliderConfigDefault = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};
const Testimonial = () => {
  const sliderRef = useRef();
  return (
    <div className="testimonil-section-07">
      <div
        className="testimonil-section-07__shape"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img src="./image/home-8/shape.svg" className="w-100" alt="shape" />
      </div>
      <div
        className="testimonil-section-07__dots"
        data-aos="fade-right"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img src="./image/home-8/t-dots.svg" className="w-100" alt="shape" />
      </div>
      <div className="container">
        <div className="section-title content-title text-center">
          <h6 className="subtitle text-secondary  mb-20">Testimonial</h6>
          <h2 className="title">
            See what our members are <br className="d-none d-xs-block" />
            saying about Custer
          </h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="testimonil-section-07__slider">
              <SlickSlider
                className="testimonial-slider--06 mobile-slider"
                sliderConfig={sliderConfigDefault}
                refTarget={sliderRef}
              >
                <TestimonialCardFour
                  quoteIcon={false}
                  image="./image/home-6/testimonial-1.png"
                  name="Mila McSabbu"
                  position="Digital Marketer"
                  text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
                />

                <TestimonialCardFour
                  quoteIcon={false}
                  image="./image/home-6/t-client.png"
                  name="Jenny Wilson"
                  position="Web Developer"
                  text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
                />

                <TestimonialCardFour
                  quoteIcon={false}
                  image="./image/home-6/testimonial-2.png"
                  name="Robert Fox"
                  position="Founder, Oppora"
                  text="OMG! I cannot believe that I have got a brand new landing page after getting Custer. It was super easy to  edit and publish. "
                />
              </SlickSlider>
              <div className="testimonial-slider--06__control-buttons">
                <button
                  className="button button--prev"
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <ReactSVG
                    src="./image/home-8/slider-arrow.svg"
                    className="slick-svg-icon"
                  />
                </button>
                <button
                  className="button button--next"
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <ReactSVG
                    src="./image/home-8/slider-arrow.svg"
                    className="slick-svg-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonial;
