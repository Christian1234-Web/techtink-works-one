import React from "react";

const HeroSection = () => {
  return (
    <div className="hero-section-02 bg-gradient-primary-secondary">
      <div className="hero-section-02__shape">
        <img
          src="./image/home-2/hero-shape.png"
          alt="hero-section-shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xxl-6 col-xl-5 col-lg-6 col-md-10 col-xs-11 order-lg-2 ">
            <div
              className="hero-section-02__image-group mb-mobile-lg"
              data-aos="fade-left"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-2/hero-img.png"
                alt="hero-image"
                className="w-100"
              />
            </div>
          </div>
          <div className="col-xxl-6 col-xl-7 col-lg-6 col-md-9 col-xs-11 order-lg-1">
            <div
              className="hero-content hero-section-02__content"
              data-aos="fade-up"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <h1 className="heading-light title">
                We're building software for boost your business
              </h1>
              <p className="text-light">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justointeger at odio velna vitae auctor integer congue magna at
                pretium purus pretium ligula rutrum luctus risus
              </p>
              <a href="#" className="btn hero-btn btn-white rounded">
                Start 14 Days Free Trial
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
