import React from "react";

const CtaSection = () => {
  return (
    <div className="cta-section-10">
      <div className="cta-section-10__shape-1  floating-X-animation-reverse-01">
        <img
          src="./image/home-10/cta-shape-1.svg"
          className="make-it-inline w-100"
          alt="shape"
        />
      </div>
      <div className="cta-section-10__shape-2 floating-Y-animation-reverse-03">
        <img
          src="./image/home-10/cta-shape-2.svg"
          className="make-it-inline w-100"
          alt="shape"
        />
      </div>
      <div className="cta-section-10__shape-3 floating-X-animation-reverse-01">
        <img
          src="./image/home-10/cta-shape-3.svg"
          className="make-it-inline w-100"
          alt="shape"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-8 col-sm-10"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title text-center">
              <h2 className="title heading-light">
                Custer is available for all devices
              </h2>
              <p className="heading-light">
                A Private Limited is the most popular type of partnership Malta.
                The limited liabilityis, in <br className="d-none d-xl-block" />{" "}
                fact, the only type of the company allowed by Companies.
              </p>
            </div>
            <div className="cta-section-10__button-group">
              <a href="#">
                <img src="./image/home-10/appstore.png" alt="appstore" />
              </a>
              <a href="#">
                <img src="./image/home-10/playstore.png" alt="playstore" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
