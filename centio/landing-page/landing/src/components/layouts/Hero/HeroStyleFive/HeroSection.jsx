import React from "react";
import { ReactSVG } from "react-svg";

const HeroSection = () => {
  return (
    <div className="hero-section-05">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-6 col-sm-7 col-xs-11">
            <div className="hero-section-05__content hero-content mb-mobile-lg">
              <h1 className="title mb-20">
                Growth your career through online education
              </h1>
              <p className="text-dark text">
                An enim nullam tempor sapien gravida donec enim ipsum portajusto
                congue magna at pretium purus pretium ligula
              </p>
              <a
                className="btn hero-btn btn-primary btn-primary-hvr btn-w-arrow btn-arrow-anim-01"
                href="#"
              >
                
                Get your card
                <i>
                  <ReactSVG
                    src="./image/icons/icon-arrow-button.svg"
                    alt="icon"
                  />
                </i>
              </a>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-5 col-xs-11 offset-xxl-1">
            <div
              className="hero-section-05__image-group"
              data-aos="fade-left"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-5/hero-right.png"
                alt="hero-img"
                className="w-100"
              />
              <div className="hero-section-05__image-group--shape floating-Y-animation">
                <ReactSVG
                  src="./image/home-5/hero-img-shape.svg"
                  className="react-shape-w-100"
                  alt="shape"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-05__shape-1 floating-Y-animation-reverse-02">
        <ReactSVG
          src="./image/home-5/shape-left.svg"
          alt="shape"
          className="react-shape-w-100"
        />
      </div>
      <div className="hero-section-05__shape-2">
        <ReactSVG
          src="./image/home-5/shape-right.svg"
          alt="shape"
          className="react-shape-w-100"
        />
      </div>
      <div className="hero-section-05__shape-3 circle-animation">
        <ReactSVG
          src="./image/home-5/shape-center.svg"
          alt="shape"
          className="react-shape-w-100 fill-tertiary"
        />
      </div>
    </div>
  );
};

export default HeroSection;
