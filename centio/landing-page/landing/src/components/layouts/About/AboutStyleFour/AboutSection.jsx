import React from "react";
const AboutSection = () => {
  return (
    <div className="about-section-04 overflow-hidden">
      <div className="about-section-04--shape">
        <img src="./image/home-7/content-shape.png" alt="shape" />
      </div>
      <div className="about-section-04__circle-1 particle" />
      <div className="about-section-04__circle-2 particle" />
      <div className="about-section-04__circle-1 particle" />
      <div className="about-section-04__circle-2 particle" />
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 col-md-7 col-sm-8 col-xs-9"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="about-section-04__image-group">
              <img
                src="./image/home-7/content-1.png"
                alt="content-image"
                className="w-100"
              />
              <div className="content-section-14__image-group--card">
                <img
                  src="./image/home-7/content-1-card.png"
                  alt="card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 offset-xl-1 col-lg-6 col-md-8 col-xs-10 col-sm-11 "
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title about-section-04__content">
              <h6 className="subtitle text-secondary mb-20">Awesome Custer</h6>
              <h2 className="title">
                Custer is a raised tracking platform for marketing software
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor integer congue magna at
                pretium{" "}
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
