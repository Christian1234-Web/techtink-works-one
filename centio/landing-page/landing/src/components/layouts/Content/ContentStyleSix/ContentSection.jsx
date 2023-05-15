import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-06">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-xl-5 col-lg-6 col-md-9 col-sm-9 col-xs-11 col-12 mb-mobile-lg"
            data-aos="zoom-in"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-06__texts text-center text-lg-start">
              <div className="block-title content-title">
                <h2 className="title">
                  Finally a perfect app <br className="d-none d-xs-block" />{" "}
                  that works for you!
                </h2>
                <p className="text-dark">
                  An enim nullam tempor gravida donec enim{" "}
                  <br className="d-none d-xs-block" />
                  congue magna at pretium purus pretium ligula{" "}
                  <br className="d-none d-xs-block" />
                  rutrum luctus risusd diam eget risus varius
                  <br className="d-none d-xs-block" /> blandit sit amet non
                  magna.
                </p>
                <a href="#" className="btn btn-primary btn-primary-hvr">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-6 col-sm-10 col-xs-7">
            <div className="content-section-06__image-group">
              <img src="./image/home-3/content-2.png" alt="content-image" />
              <div className="content-card-1 floating-Y-animation">
                <img
                  src="./image/home-3/content-card-1.png"
                  alt="content-card"
                />
              </div>
              <div className="content-card-2 floating-Y-animation-reverse">
                <img
                  src="./image/home-3/content-card-2.png"
                  alt="content-card"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
