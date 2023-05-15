import React from "react";
import { ReactSVG } from "react-svg";

const CtaSection = () => {
  return (
    <div className="cta-section-08 cta-bg-group-5">
  <div className="container">
    <div className="cta-section-08__wrapper">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-md-10 co-xs-12 col-sm-12 col-12">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-8">
              <div className="cta-section-08__contennt text-center text-xl-start">
                <div className="block-title" data-aos="fade-right" data-aos-duration={800}>
                  <h2 className="heading-light title">Custer is available <br className="d-none d-xs-block" /> for all devices.</h2>
                  <p className="heading-light">A Private Limited is the most . The limited liabilityis, in <br className="d-none d-lg-block" /> fact, the only company allowed by Companies.</p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="cta-section-08__button-group m-auto" data-aos="fade-left" data-aos-duration={800}>
                <a href="#">
                  <img src="./image/home-6/appstore.png" className="w-100" alt="store" />
                </a>
                <a href="#">
                  <img src="./image/home-6/playstore.png" className="w-100" alt="store" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cta-section-08__wrapper--shape-1 two-way-circle">
        <ReactSVG src="./image/home-8/cta-circel.svg" className="" alt="shape" />
      </div>
      <div className="cta-section-08__wrapper--shape-3  floating-Y-animation-reverse-03">
        <ReactSVG src="./image/home-8/cta-shape-3.svg" className="" alt="shape" />
      </div>
      <div className="cta-section-08__wrapper--shape-4 circle-animation-02">
        <ReactSVG src="./image/home-8/cta-shape-4.svg" className="" alt="shape" />
      </div>
      <div className="cta-section-08__wrapper--shape-5 floating-X-animation-reverse-01">
        <ReactSVG src="./image/home-8/cta-shape-5.svg" className="" alt="shape" />
      </div>
    </div>
  </div>
</div>

  );
};

export default CtaSection;
