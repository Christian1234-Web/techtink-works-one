import React from "react";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-12">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-7 col-md-7 col-sm-8 col-xs-9 col-11">
            <div className="content-section-12__image-group">
              <img src="./image/home-5/content-2.png" alt="content-2" />
              <div
                className="content-section-12__image-group--group"
                data-aos="fade-up"
                data-aos-delay={1300}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-5/content-2-group.png"
                  alt="content-2-group"
                  className="w-100"
                />
              </div>
              <div
                className="content-section-12__image-group--dots"
                data-aos="fade-left"
                data-aos-delay={1300}
                data-aos-duration={1000}
              >
                <ReactSVG
                  src="./image/home-5/dots.svg"
                  alt="content-2-group"
                  className="w-100"
                />
              </div>
              <div
                className="content-section-12__image-group--shape"
                data-aos="fade-right"
                data-aos-delay={1300}
                data-aos-duration={1000}
              >
                <ReactSVG
                  src="./image/home-5/content-2-shape.svg"
                  alt="content-2-group"
                  className="w-100 make-it-inline fill-tertiary"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-5 col-md-7 col-sm-8 col-xs-9"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title content-title">
              <h6 className="subtitle text-secondary mb-20">Learn anything</h6>
              <h2 className="title">Learn fast &amp; easily with our app.</h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor integer congue magna at
                pretium purus.
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

export default ContentSection;
