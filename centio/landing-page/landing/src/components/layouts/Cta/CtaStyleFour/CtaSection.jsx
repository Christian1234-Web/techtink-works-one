import React from "react";
import { ReactSVG } from "react-svg";

const CtaSection = () => {
  return (
    <div className="cta-section-04 cta-bg-group-1">
      <div className="container">
        <div className="cta-section-04__wrapper overflow-hidden">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-md-10 co-xs-12 col-sm-12 col-12">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-md-8">
                  <div className="cta-section-04__contennt text-center text-xl-start">
                    <div
                      className="block-title"
                      data-aos="fade-right"
                      data-aos-duration={800}
                    >
                      <h2 className="heading-light title">
                        Custer is available <br className="d-none d-xs-block" />{" "}
                        for all devices.
                      </h2>
                      <p className="heading-light">
                        A Private Limited is the most . The limited liabilityis,
                        in <br className="d-none d-lg-block" /> fact, the only
                        company allowed by Companies.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div
                    className="cta-section-04__button-group m-auto"
                    data-aos="fade-left"
                    data-aos-duration={800}
                  >
                    <a href="#">
                      <img
                        src="./image/common/appstore.png"
                        className="w-100"
                        alt="app store"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="./image/common/playstore.png"
                        className="w-100"
                        alt="app store"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="cta-section-04__wrapper--shape-1"
            data-aos="fade-left"
            data-aos-delay={1300}
            data-aos-duration={1000}
          >
            <ReactSVG
              src="./image/common/cta-shape-1.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div
            className="cta-section-04__wrapper--shape-2"
            data-aos="fade-left"
            data-aos-delay={1600}
            data-aos-duration={1000}
          >
            <ReactSVG
              src="./image/common/cta-shape-2.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-04__wrapper--shape-3 floating-Y-animation-reverse-03">
            <ReactSVG
              src="./image/common/cta-shape-3.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-04__wrapper--shape-4 circle-animation-02">
            <ReactSVG
              src="./image/common/cta-shape-4.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-04__wrapper--shape-5 floating-X-animation-reverse-01">
            <ReactSVG
              src="./image/common/cta-shape-5.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
        </div>
      </div>
      <div className="cta-bg-group-1--shape-1">
        <ReactSVG
          src="./image/common/cta-shape-1.svg"
          className="make-it-inline"
          alt="shape"
        />
      </div>
      <div className="cta-bg-group-1--shape-2">
        <ReactSVG
          src="./image/common/cta-shape-2.svg"
          className="make-it-inline"
          alt="shape"
        />
      </div>
    </div>
  );
};

export default CtaSection;
