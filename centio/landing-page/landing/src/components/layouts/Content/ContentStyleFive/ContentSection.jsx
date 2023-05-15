import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-05">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-5 col-sm-10 col-xs-7 mb-mobile-lg">
            <div className="content-section-05__image-group">
              <img src="./image/home-3/content-1.png" alt="content-image" />
            </div>
          </div>
          <div
            className="col-xl-5 offset-xl-1 col-lg-6 col-md-8 col-sm-10 col-xs-8"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-05__texts text-center text-lg-start">
              <div className="block-title content-title">
                <h2 className="title">Easy to manage all content by Custer</h2>
                <p className="text-dark">
                  An enim nullam tempor gravida donec enim luctus{" "}
                  <br className="d-none d-sm-block" /> risusd diam eget risus
                  varius blandit sit amet.
                </p>
              </div>
              <div className="content-section-05__texts--widgets">
                <div className="singel-widget">
                  <h5>Feature Integration</h5>
                  <p className="text-dark">
                    We believe that designing products and services
                    <br className="d-none d-sm-block" /> in close is the only
                    way to have a real impact on
                    <br className="d-none d-sm-block" /> their business.
                  </p>
                </div>
                <div className="singel-widget">
                  <h5>Multiple Discussions</h5>
                  <p className="text-dark">
                    We believe that designing products and services
                    <br className="d-none d-sm-block" /> in close is the only
                    way to have a real impact on
                    <br className="d-none d-sm-block" /> their business.
                  </p>
                </div>
              </div>
              <div className="button">
                <a href="#" className="btn btn-primary btn-primary-hvr">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
