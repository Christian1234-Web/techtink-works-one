import React from "react";
import { ReactSVG } from "react-svg";
// import HeroImage from "~image";

const HeroSection = () => {
  return (
    <div className="hero-section-04">
      <div className="hero-section-04__bg-shape">
        <img src="./image/home-4/hero-bg.png" alt="hero image" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-9 col-xs-11">
            <div className="hero-section-04__content hero-content text-center">
              <h1 className="heading-light title">
                Great way to get <br className="d-none d-md-block" /> banking
                services easily
              </h1>
              <p className="text-light">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-md-block" /> justo congue magna at
                pretium purus pretium ligula{" "}
              </p>
              <form
                action="/"
                className="form-subscribe-inline--01 hero-section-04__content--form"
                method="POST"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-control"
                />
                <button className="btn hero-btn btn-primary btn-primary-hvr">
                  Start 14 Days Trial
                </button>
              </form>
            </div>
            <div className="hero-section-04__image-group">
              <img src="./image/home-4/hero.png" alt="mainimage" />
              <div
                className="position-relative wrap"
                data-aos="fade-up"
                data-aos-delay={500}
                data-aos-duration={1000}
              >
                <div className="hero-section-04__image-group--half-shape">
                  <ReactSVG
                    src="./image/home-4/hero-circal.svg"
                    alt="chircal-bg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-04__shape-1 floating-Y-animation-reverse-02">
        <ReactSVG
          src="./image/home-4/hero-shape-1.svg"
          alt="shape"
          className="react-shape-w-100 fill-secondary"
        />
      </div>
      <div className="hero-section-04__shape-2 floating-Y-animation-02">
        <ReactSVG
          src="./image/home-4/hero-shape-2.svg"
          alt="shape"
          className="react-shape-w-100"
        />
      </div>
      <div className="hero-section-04__shape-3 circle-animation">
        <ReactSVG src="./image/home-4/hero-shape-3.svg" alt="shape" />
      </div>
    </div>
  );
};

export default HeroSection;
