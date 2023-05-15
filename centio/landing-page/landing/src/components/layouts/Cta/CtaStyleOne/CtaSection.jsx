import React from "react";
import { ReactSVG } from "react-svg";

const CtaSection = () => {
  return (
    <div className="cta-section-01 bg-secondary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-9 col-xs-11">
            <div className="block-title text-center">
              <h2 className="title heading-light">
                Join of our community of 10,0000 users of the world’s leading
                organizations
              </h2>
            </div>
            <form
              action="/"
              className="form-subscribe-inline--01 cta-section-01__newsletter"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />
              <button className="btn btn-primary btn-primary-hvr">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
        <div className="cta-section-01--shapes">
          <div className="cta-shape cta-shape--01 overflow-hidden">
            <div
              className="transform-origin-top-right"
              data-aos="zoom-in"
              data-aos-duration={1000}
              data-aos-delay={500}
            >
              <ReactSVG
                src="./image/home-1/cta-shape-1.svg"
                alt="shape"
                className="fill-tertiary"
              />
            </div>
          </div>
          <div className="cta-shape cta-shape--02">
            <ReactSVG
              src="./image/home-1/cta-shape-2.svg"
              alt="shape"
              className="fill-tertiary"
            />
          </div>
          <div
            className="cta-shape cta-shape--03"
            data-aos="fade-right"
            data-aos-duration={900}
            data-aos-delay={500}
          >
            <ReactSVG
              src="./image/home-1/cta-shape-3.svg"
              alt="shape"
              className="fill-tertiary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
