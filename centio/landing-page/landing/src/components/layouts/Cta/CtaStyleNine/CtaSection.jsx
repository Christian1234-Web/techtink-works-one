import React from "react";
import { ReactSVG } from "react-svg";

const CtaSection = () => {
  return (
    <div className="cta-section-09">
      <div className="cta-section-09__bg-shape">
        <img src="../image/home-9/cta-bg.png" alt="background" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-8 col-sm-10"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title text-center cta-section-09__content">
              <h2 className="title heading-light">
                Custer is available for all devices
              </h2>
              <p className="heading-light">
                A Private Limited is the most popular type of partnership Malta.
                The limited liabilityis, in <br className="d-none d-xl-block" />{" "}
                fact, the only type of the company allowed by Companies.
              </p>
            </div>
            <div className="cta-section-09__button-group">
              <a href="#">
                <img src="./image/home-9/appstore.png" alt="appstore" />
              </a>
              <a href="#">
                <img src="./image/home-9/playstore.png" alt="playstore" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
