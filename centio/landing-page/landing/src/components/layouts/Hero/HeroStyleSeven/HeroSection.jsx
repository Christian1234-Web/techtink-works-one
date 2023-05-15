import React from "react";
import Video from "~components/Core/VideoModal";

const HeroSection = () => {
  return (
    <div className="hero-section-07 bg-dodger-blue">
      <div className="hero-section-07__bottom-shape">
        <img src="./image/home-7/hreo-shape.png" alt="shape" />
      </div>
      <div className="hero-section-07__shape-1 circle-x-02">
        <img
          src="./image/home-7/round-shape.svg"
          className="w-100"
          alt="shape"
        />
      </div>
      <div className="hero-section-07__circle-1 particle" />
      <div className="hero-section-07__circle-2 particle" />
      <div className="hero-section-07__circle-3 particle" />
      <div className="hero-section-07__circle-4 particle" />
      <div className="hero-section-07__circle-5 particle" />
      <div className="hero-section-07__circle-1 particle" />
      <div className="hero-section-07__circle-2 particle" />
      <div className="hero-section-07__circle-3 particle" />
      <div className="hero-section-07__circle-4 particle" />
      <div className="hero-section-07__circle-5 particle" />
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-lg-6 col-md-9 col-sm-10 col-xs-10"
            data-aos="fade-right"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <div className="hero-section-07__content hero-content mb-mobile-lg">
              <h1 className="title heading-light">
                The best marketing software to grow your business
              </h1>
              <p className="text-light text">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-xl-block" /> justo congue magna at
                pretium purus pretium ligula{" "}
              </p>
              <div className="hero-section-07__content--btn-group">
                <a
                  className="btn hero-btn btn-primary btn-primary-hvr"
                  href="#"
                >
                  Start 15 days free trial
                </a>
                <Video className="btn-2 popup-btn" id="LWZ7iytIA6k">
                  <div className="icon">
                    <img src="./image/home-7/hero-play.svg" alt="icon" />
                  </div>
                  <span>Watch video</span>
                </Video>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-9 col-sm-10 col-xs-10">
            <div
              className="hero-section-07__image-group text-center"
              data-aos="fade-up"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <img src="./image/home-7/hero.png" alt="hero-img" />
              <div
                className="hero-section-07__image-group--shape"
                data-aos="fade-up"
                data-aos-delay={1500}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-7/hero-shape.png"
                  alt="hero-shape"
                  className="w-100"
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
