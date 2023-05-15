import React from "react";

const HeroSection = () => {
  return (
    <div
      className="hero-section-03 overflow-hidden"
      style={{ backgroundImage: "url(./image/home-3/hero-bg.png)" }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 col-md-6 col-sm-7 col-xs-7 offset-xl-1 order-lg-2 col-11">
            <div
              className="hero-section-03__image-group"
              data-aos="fade-up"
              data-aos-duration={1300}
              data-aos-delay={1000}
            >
              <img src="./image/home-3/images.png" alt="iPhone" />
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6  col-md-9 col-xs-11 order-lg-1"
            data-aos="fade-right"
            data-aos-duration={1300}
            data-aos-delay={1000}
          >
            <div className="hero-content hero-section-03__content">
              <h1 className="title heading-light">
                Create a beautiful landing page easily for mobile app.
              </h1>
              <p className="text-light">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo <br className="d-none d-xxl-block" /> integer at integer
                congue magna at pretium purus pretium ligula rutrum.{" "}
              </p>
              <div className="hero-section-03__content--button-group">
                <a href="#">
                  <img src="./image/home-3/appstore.png" alt="appstore" />
                </a>
                <a href="#">
                  <img src="./image/home-3/playstore.png" alt="playstore" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-03__shape">
        <img
          src="./image/home-3/hero-shape.png"
          alt="shape"
          className="w-100"
        />
      </div>
    </div>
  );
};

export default HeroSection;
