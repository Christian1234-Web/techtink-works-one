import React from "react";
// import HeroImage from "~image";

const HeroSection = () => {
  return (
    <div className="hero-section-01 bg-secondary">
      <div className="shape">
        <img src="./image/home-1/hero-shap-curve.svg" alt="shape" />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center justify-content-lg-start">
          <div className="col-xxl-4  col-xl-5 col-lg-5 offset-lg-1 col-md-6 col-sm-6 col-xs-7 col-10 order-lg-2">
            <div className="hero-section-01__image-group">
              <img
                src="../image/home-1/hero-image-main.png"
                alt="hero-img"
                className="w-100"
              />
              <div
                className="hero-section-01__half-image"
                data-aos="fade-left"
                data-aos-delay={1300}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-1/hero-image-half.png"
                  alt="herohalf"
                  className="w-100"
                />
              </div>
              <div
                className="hero-section-01__shape-1"
                data-aos="fade-left"
                data-aos-duration={800}
                data-aos-delay={2000}
              >
                <img
                  src="./image/home-1/content-shape-02.svg"
                  alt="herohalf"
                  className="make-it-inline"
                />
              </div>
              <div
                className="hero-section-01__shape-2 "
                data-aos="zoom-in"
                data-aos-delay={2800}
              >
                <img
                  src="./image/home-1/content-shape-01.svg"
                  alt="herohalf"
                  className="make-it-inline floating-Y-animation"
                />
              </div>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-6 col-md-8 col-11 order-lg-1">
            <div
              className="hero-section-01__content hero-content text-center text-lg-start"
              data-aos="fade-up"
              data-aos-duration={1000}
              data-aos-delay={1000}
            >
              <h1 className="heading-light title">
                Create your next mobile app landing page in minutes.
              </h1>
              <p className="text-light">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor integer congue magna at
                pretium purus pretium ligula rutrum luctus risus
              </p>
              <form
                action="/"
                className="form-subscribe-inline--01 hero-section-01__form"
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
    </div>
  );
};

export default HeroSection;
