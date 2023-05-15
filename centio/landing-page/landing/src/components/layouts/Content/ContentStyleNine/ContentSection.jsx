import React from "react";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-09">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-9 col-sm-9 col-xs-11">
            <div className="content-section-09__image-group text-center mb-mobile-lg">
              <img src="./image/home-4/content-1.png" alt="content-image" />
              <div className="content-section-09__image-group--shape-1 shape-x-1 fill-secondary">
                <ReactSVG
                  src="./image/home-4/content-1-shape-1.svg"
                  alt="shape"
                />
              </div>
              <div className="content-section-09__image-group--shape-2 shape-x-2">
                <ReactSVG
                  src="./image/home-4/content-1-shape-2.svg"
                  alt="shape"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 offset-xl-1 col-lg-6 col-md-9 col-xs-11"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-09__texts text-center text-lg-start">
              <div className="block-title">
                <h6 className="subtitle text-secondary mb-20">
                  Track Everything
                </h6>
                <h2 className="title">
                  We track your daily expenses with better algorithm &amp; data.
                </h2>
                <p className="text-dark">
                  An enim nullam tempor sapien gravida donec enim ipsum porta
                  justo integer at odio velna vitae auctor integer congue magna
                  at pretium purus pretium ligula.
                </p>
                <a className="btn btn-primary btn-primary-hvr" href="#">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
