import React from "react";

const CtaSection = () => {
  return (
    <div className="cta-section-06 cta-bg-group-3">
      <div className="container">
        <div className="cta-section-06__wrapper">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-md-10 co-xs-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-xl-6 col-md-8">
                  <div className="cta-section-06__contennt">
                    <div
                      className="block-title"
                      data-aos="fade-right"
                      data-aos-duration={800}
                    >
                      <h2 className="heading-light title">
                        Custer is available <br className="d-none d-xs-block" />
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
                    className="cta-section-06__button-group"
                    data-aos="fade-left"
                    data-aos-duration={800}
                  >
                    <a href="#">
                      <img
                        src="./image/home-6/appstore.png"
                        className="w-100"
                        alt="store"
                      />
                    </a>
                    <a href="#">
                      <img
                        src="./image/home-6/playstore.png"
                        className="w-100"
                        alt="store"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cta-section-06__wrapper--shape-1">
            <img src="./image/home-6/cta-shape-1.svg" alt="shape" />
          </div>
          <div className="cta-section-06__wrapper--shape-3 floating-Y-animation-reverse-03">
            <img src="./image/home-6/cta-shape-3.svg" alt="shape" />
          </div>
          <div className="cta-section-06__wrapper--shape-4 circle-animation-02">
            <img src="./image/home-6/cta-shape-4.svg" alt="shape" />
          </div>
          <div className="cta-section-06__wrapper--shape-5 floating-X-animation-reverse-01">
            <img src="./image/home-6/cta-shape-5.svg" alt="shape" />
          </div>
        </div>
      </div>
      <div className="cta-bg-group-3--shape-1">
        <img src="./image/home-6/cta-shape-1.svg" alt="shape" />
      </div>
    </div>
  );
};

export default CtaSection;
