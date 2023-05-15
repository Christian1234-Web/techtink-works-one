import React from "react";

const HeroSection = () => {
  return (
    <div className="hero-section-06 overflow-hidden">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 offset-xl-1 col-md-6 col-sm-8  col-11 order-md-2">
            <div
              className="hero-section-06__image-group"
              data-aos="fade-left"
              data-aos-delay={1300}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-6/hero-img.png"
                className="w-100"
                alt="image"
              />
              <div
                className="hero-section-06__image-group--card"
                data-aos="fade-left"
                data-aos-delay={1600}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-6/hero-card.png"
                  className="w-100"
                  alt="card"
                />
              </div>
              <div
                className="hero-section-06__image-group--circel"
                data-aos="zoom-in"
                data-aos-delay={2000}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-6/hero-circel.svg"
                  className="w-100"
                  alt="shape"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-6 order-md-1"
            data-aos="fade-up"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <div className="hero-section-06__content hero-content">
              <h1 className="title heading-light">
                Thinking the high quality software for your business
              </h1>
              <p className="text-light text">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-xl-block" /> justo congue magna at
                pretium purus pretium ligula{" "}
              </p>
              <div className="hero-section-06__content--btn-group">
                <a
                  className="btn hero-btn btn-primary btn-primary-hvr"
                  href="#"
                >
                  {" "}
                  Get Started
                </a>
                <a
                  className="btn-2"
                  data-fancybox
                  href="https://www.youtube.com/watch?v=LWZ7iytIA6k"
                >
                  <img src="./image/home-6/button-play.svg" alt="icon" />
                  Watch the intro video
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
