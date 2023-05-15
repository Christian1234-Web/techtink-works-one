import React from "react";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-20">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7 col-lg-6 col-md-8 col-sm-10 col-xs-11 order-lg-2">
            <div
              className="content-section-20__image-group"
              data-aos="fade-left"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-9/content-2.png"
                alt="content-img"
                className="mw-100"
              />
              <div
                className="content-section-20__image-group--card"
                data-aos="fade-up"
                data-aos-delay={1000}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-9/content-2-card.png"
                  alt="image-card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-xs-11 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title content-section-20__content">
              <h6 className="subtitle text-blue mb-20">Totally optimized</h6>
              <h2 className="title">
                Custer makes your <br className="d-none d-xl-block" /> business
                stronger
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum
                <br className="d-none d-xl-block" /> porta justo integer at odio
                velna vitae auctor integer
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
