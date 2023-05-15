import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-13 overflow-hidden">
      <div
        className="content-section-13__shape"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img src="./image/home-6/content-shape.svg" alt="shape" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-lg-6 col-md-8 col-xs-10 col-sm-11 "
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title content-section-13__content mb-mobile-lg">
              <h6 className="subtitle text-secondary  mb-20">Why choose us</h6>
              <h2 className="title">
                Custer protect your <br className="d-none d-xl-block" /> data
                like never before
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo <br className="d-none d-xl-block" /> integer at odio velna
                vitae auctor integer congue magna at pretium{" "}
              </p>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-6 col-md-10  col-xs-10 col-sm-11 offset-xl-1"
            data-aos="zoom-in"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-13__image-group">
              <img
                src="./image/home-6/content-1.png"
                alt="content-image"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
