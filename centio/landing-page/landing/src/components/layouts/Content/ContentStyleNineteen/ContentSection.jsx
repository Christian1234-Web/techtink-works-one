import React from "react";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-19">
      <div
        className="content-section-19__dots"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img src="./image/home-9/dots.svg" className="w-100" alt="shape" />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-8 col-sm-10 col-xs-11">
            <div
              className="content-section-19__image-group"
              data-aos="fade-right"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-9/content-1.png"
                alt="content-img"
                className="mw-100"
              />
              <div
                className="content-section-19__image-group--card"
                data-aos="fade-up"
                data-aos-delay={1000}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-9/content-1-card.png"
                  alt="image-card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xxl-5 offset-xxl-2 col-xl-6 col-lg-6 col-md-8 col-sm-10 col-xs-11"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title content-section-19__content">
              <h6 className="subtitle text-blue mb-20">About Custer </h6>
              <h2 className="title">Custer manage and grow your business</h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum
                <br className="d-none d-xl-block" /> porta justo integer at odio
                velna vitae auctor integer congue
              </p>
              <ul className="content-section-19__content--list">
                <li>
                  <ReactSVG
                    src="./image/home-9/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />
                  Boost SEO
                </li>
                <li>
                  <ReactSVG
                    src="./image/home-9/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />
                  Manage Buying
                </li>
                <li>
                  <ReactSVG
                    src="./image/home-9/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />
                  Visual Reviews
                </li>
                <li>
                  <ReactSVG src="./image/home-9/check.svg" alt="check" />
                  Buyer Protection
                </li>
                <li>
                  <ReactSVG
                    src="./image/home-9/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />
                  Social Sharing
                </li>
                <li>
                  <ReactSVG
                    src="./image/home-9/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />
                  Virtual Card
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
