import React from "react";
import Video from "~components/Core/VideoModal";

const HeroSection = () => {
  return (
    <div className="hero-section-10">
      <div className="hero-section-10__rectangle">
        <img src="./image/home-10/hero-rectangle.png" alt="shape" />
      </div>
      <div className="hero-section-10__shape-1">
        <img
          src="./image/home-10/hero-shape-1.svg"
          className="w-100"
          alt="shape"
        />
      </div>
      <div className="hero-section-10__shape-2 circle-animation">
        <img
          src="./image/home-10/hero-shape-2.svg"
          className="w-100"
          alt="shape"
        />
      </div>
      <div className="hero-section-10__shape-3 floating-Y-animation-reverse-03">
        <img
          src="./image/home-10/hero-shape-3.svg"
          className="w-100"
          alt="shape"
        />
      </div>
      <div
        className="hero-section-10__shape-4"
        data-aos="fade-left"
        data-aos-delay={1300}
        data-aos-duration={1000}
      >
        <img src="./image/home-10/dots.svg" alt="shape" className="w-100" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="hero-section-10__content hero-content">
              <h1 className="title heading-light">
                Custer is the best email marketing software
              </h1>
              <p className="text-light text">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-xs-block" /> justo congue tempor sapien
                gravida donec enim{" "}
              </p>
              <div className="hero-section-10__content--btn-group">
                <a
                  className="btn hero-btn btn-primary btn-primary-hvr"
                  href="#"
                >
                  Try for free
                </a>
                <Video id="LWZ7iytIA6k" className="btn-2 text-white" href="#">
                  <img
                    src="./image/home-10/button-play.svg"
                    alt="button play"
                  />
                  Watch the intro video
                </Video>
              </div>
            </div>
            <div
              className="hero-section-10__image-group text-center"
              data-aos="fade-up"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-10/hero.png"
                className="mw-100"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
