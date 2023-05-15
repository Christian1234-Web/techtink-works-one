import React from "react";
import { ReactSVG } from "react-svg";

const CtaSection = () => {
  return (
    <div className="cta-section-05 cta-bg-group-2">
      <div className="cta-bg-group-2--shape-1">
        <ReactSVG
          src="./image/home-5/cta-shape-1.svg"
          className="make-it-inline"
          alt="shape"
        />
      </div>
      <div className="cta-bg-group-2--shape-2">
        <ReactSVG
          src="./image/home-5/cta-shape-2.svg"
          className="make-it-inline"
          alt="shape"
        />
      </div>
      <div className="container">
        <div className="cta-section-05__wrapper overflow-hidden">
          <div className="row justify-content-center">
            <div
              className="col-xl-10 col-md-10 col-sm-11 col-xs-12"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <div className="cta-section-05__contennt">
                <div className="block-title text-center">
                  <h2 className="heading-light title">
                    Want us to email you about special{" "}
                    <br className=" d-none d-xs-block" /> offers &amp; updates?
                  </h2>
                </div>
                <form
                  action="/"
                  className="form-subscribe-inline--01 cta-section-05__newsletter"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="form-control"
                  />
                  <button className="btn btn-primary btn-primary-hvr">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div
            className="cta-section-05__wrapper--shape-1"
            data-aos="fade-left"
            data-aos-delay={1000}
            data-aos-duration={1000}
          >
            <ReactSVG
              src="./image/home-5/cta-shape-1.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div
            className="cta-section-05__wrapper--shape-2"
            data-aos="fade-left"
            data-aos-delay={1500}
            data-aos-duration={1000}
          >
            <ReactSVG
              src="./image/home-5/cta-shape-2.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-05__wrapper--shape-3 floating-Y-animation-reverse-03">
            <ReactSVG
              src="./image/home-5/cta-shape-3.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-05__wrapper--shape-4 floating-X-animation-reverse-01">
            <ReactSVG
              src="./image/home-5/cta-shape-4.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
