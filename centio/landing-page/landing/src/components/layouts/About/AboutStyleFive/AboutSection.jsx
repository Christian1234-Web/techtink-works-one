import React from "react";
import { ReactSVG } from "react-svg";
const AboutSection = () => {
  return (
    <div className="about-section-05">
      <div
        className="about-section-05__shape"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <ReactSVG src="./image/home-8/shape.svg" className="react-svg-w-100" alt="shape" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-6">
            <div
              className="about-section-05__image-group mb-mobile-lg"
              data-aos="fade-right"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-8/about.png"
                alt="about-img"
                className="w-100"
              />
            </div>
          </div>
          <div
            className="col-xl-5 offset-xl-2 col-lg-6"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="about-section-05__content block-title">
              <h6 className="subtitle text-secondary  mb-20">About Custer</h6>
              <h2 className="title">
                Custer teams lead the way to better healthcare &amp; treatments
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum{" "}
                <br className="d-none d-xl-block" />
                porta justo integer at odio velna vitae auctor integer congue{" "}
              </p>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
