import React from "react";
const ContentSection = () => {
  return (
    <div className="content-section-03">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-xxl-5 col-xl-6 col-md-8  col-xs-11 mb-mobile-lg">
            <div
              className="video-block video-block--02"
              data-aos="zoom-in"
              data-aos-duration={800}
            >
              <img
                src="./image/home-2/content-1.png"
                alt="content-image"
                className="w-100"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xxl-6 col-md-9 col-xl-6 offset-xxl-1 col-xs-11 ">
            <div
              className="content-section-03__texts block-title text-center text-lg-start"
              data-aos="fade-left"
              data-aos-duration={800}
            >
              <h6 className="subtitle text-primary">Why Choose Us</h6>
              <h2 className="title">
                Starting with sofex is <br className="d-none d-sm-block" />{" "}
                easier than anything!
              </h2>
              <p className="text-dark">
                Vero homero perfecto mei ut, sonet aperiam an nec. Ni
                <br className="d-none d-xl-block" /> nec dict altera legimu. Me
                vita de lege ndo haeo tibi que
                <br className="d-none d-xl-block" /> com titure viset cut.Proin
                tempus elit a laoreet volut pat.
              </p>
              <a href="#" className="btn btn-secondary btn-secondary-hvr">
                Download Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
