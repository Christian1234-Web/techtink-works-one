import React from "react";

const CtaSection = () => {
  return (
    <div className="cta-section-07 cta-bg-group-4">
      <div className="container">
        <div className="cta-section-07__wrapper overflow-hidden">
          <div className="row justify-content-center">
            <div
              className="col-xl-10 col-md-10 co-xs-12 col-sm-12 col-12"
              data-aos="fade-up"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <div className="cta-section-07__contennt">
                <div className="block-title text-center">
                  <h2 className="heading-light title">
                    Create better experiences with
                    <br className=" d-none d-xs-block" /> Custer marketing
                    software
                  </h2>
                </div>
                <form
                  action="/"
                  className="form-subscribe-inline--01 cta-section-07__newsletter"
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
          <div className="cta-section-07__wrapper--top-shape">
            <img src="./image/home-7/cta-top-shape.png" alt="shape" />
          </div>
          <div
            className="cta-section-07__wrapper--shape-1"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <img
              src="./image/home-7/cta-shape-1.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div className="cta-section-07__wrapper--shape-2 circle-animation">
            <img
              src="./image/home-7/cta-shape-2.svg"
              className="make-it-inline"
              alt="shape"
            />
          </div>
          <div
            className="cta-section-07__wrapper--shape-3"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <img
              src="./image/home-7/cta-shape-3.png"
              className="w-100"
              alt="shape"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
