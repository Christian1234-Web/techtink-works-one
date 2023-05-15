import React from "react";
import { ReactSVG } from "react-svg";

const HeroSection = () => {
  return (
    <div className="hero-section-09">
      <div className="hero-section-09__shape shape-x-1">
        <img
          src="./image/home-9/section-shape-1.svg"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 col-md-10 offset-xl-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <div className="hero-section-09__image-group mb-mobile-lg">
              <img
                src="./image/home-9/hero.png"
                alt="hero-image"
                className="w-100"
              />
              <div className="hero-section-09__image-group--shape-1 shape-x-2">
                <ReactSVG
                  src="./image/home-9/hero-shape-1.svg"
                  alt="shape"
                  className="react-svg-w-100"
                />
              </div>
              <div className="hero-section-09__image-group--shape-2 shape-x-2">
                <ReactSVG
                  src="./image/home-9/hero-shape-2.svg"
                  alt="shape"
                  className="react-svg-w-100"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-6 col-md-8 col-11 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <div className="hero-section-09__content hero-content">
              <h1 className="heading-dark title">
                Grow your business faster with Custer
              </h1>
              <p className="text-dark text">
                An enim nullam tempor sapien gravida donec enim ipsum{" "}
                <br className="d-none d-xl-block" /> porta justo congue magna at
                pretium purus pretium.
              </p>
              <form
                action="/"
                className="form-subscribe-inline--01 hero-section-09__content--form"
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
          </div>
        </div>
      </div>
      <div className="hero-section-09__bg-shpae">
        <img src="./image/home-9/hero-bg.png" alt="bg" />
      </div>
    </div>
  );
};

export default HeroSection;
