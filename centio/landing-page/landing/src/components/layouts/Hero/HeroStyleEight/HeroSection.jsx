import React from "react";
import { ReactSVG } from "react-svg";

const HeroSection = () => {
  return (
    <div className="hero-section-08">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-lg-6 col-md-8 col-sm-10 col-xs-10"
            data-aos="fade-up"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <div className="hero-section-08__content hero-content mb-mobile-lg text-center text-lg-start">
              <h1 className="title heading-light mb-20">
                The smartest way to find a doctor.
              </h1>
              <p className="text-light text">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-xl-block" />
                justo congue magna at pretium purus pretium ligula{" "}
              </p>
              <div className="hero-section-08__content--button-group">
                <a href="#">
                  <img
                    src="./image/home-8/appstore.png"
                    className="mw-100"
                    alt="appstore"
                  />
                </a>
                <a href="#">
                  <img
                    src="./image/home-8/playstore.png"
                    className="mw-100"
                    alt="playstore"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-10 col-sm-10 col-xs-10">
            <div className="hero-section-08__image-group">
              <img
                src="./image/home-8/hero.png"
                alt="hero-img"
                className="w-100"
              />
              <div className="hero-section-08__image-group--shape two-way-circle react-shape-w-100 react-shape-h-100">
                <ReactSVG src="./image/home-8/hero-shape-2.svg" alt="shape" />
              </div>
              <div
                className="hero-section-08__image-group--chat-1 floating-Y-animation-reverse"
                data-aos="fade-left"
                data-aos-delay={1500}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-8/chat-1.png"
                  className="w-100 transform-origin-bottom-20p"
                  alt="icon"
                />
              </div>
              <div
                className="hero-section-08__image-group--chat-2 floating-Y-animation"
                data-aos="fade-right"
                data-aos-delay={1500}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-8/chat-2.png"
                  className="w-100 transform-origin-top-left"
                  alt="icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
