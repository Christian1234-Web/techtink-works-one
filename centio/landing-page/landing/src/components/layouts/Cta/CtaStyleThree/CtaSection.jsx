import React from "react";

const CtaSection = () => {
  return (
    <div
      className="cta-section-03"
      style={{ backgroundImage: "url(./image/home-3/cta-bg.png)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xs-11">
            <div className="block-title text-center cta-section-03__content">
              <h2 className="title heading-light">
                Custer is available for all devices
              </h2>
              <p className="heading-light">
                A Private Limited is the most popular type of partnership Malta.
                The limited liabilityis, in <br className="d-none d-xl-block" />{" "}
                fact, the only type of the company allowed by Companies.
              </p>
            </div>
            <div className="cta-section-03__button-group">
              <a href="#">
                <img src="./image/home-3/appstore.png" alt="appstore" />
              </a>
              <a href="#">
                <img src="./image/home-3/playstore.png" alt="playstore" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
