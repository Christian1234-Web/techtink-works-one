import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-01 bg-secondary">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-4 col-lg-5 offset-lg-1 col-md-6 col-sm-6 col-xs-5 col-7">
            <div className="content-section-01__image-group">
              <div className="content-section-01__image">
                <img
                  src="./image/home-1/content-image-group-main.png"
                  className="w-100"
                  alt="mobile-imag"
                />
                <div className="small-shape">
                  <img
                    src="./image/home-1/content-shape-01.svg"
                    alt="mobile-shape"
                    className="make-it-inline fill-tertiary"
                  />
                </div>
                <div
                  className="shape-half-circle"
                  data-aos="fade-left"
                  data-aos-delay={200}
                  data-aos-duration={1000}
                >
                  <img
                    src="./image/home-1/content-shape-02.svg"
                    alt="mobile-shape"
                    className="make-it-inline fill-tertiary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 offset-xl-1 col-lg-6 col-md-9 col-xs-11">
            <div
              className="block-title content-section-01__text text-center text-lg-start"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <h2 className="title heading-light">
                We develop digital <br className="d-none d-lg-block" />{" "}
                strategies products <br className="d-none d-lg-block" /> and
                services.
              </h2>
              <p className="text-light">
                Vero homero perfecto mei ut, sonet aperiam an nec. Ni{" "}
                <br className="d-none d-xl-block" /> nec dict altera legimu. Me
                vita de lege ndos expet end is
                <br className="d-none d-xl-block" /> ad.mita aliu mi ando, haeo
                tibi que com titure viset
                <br className="d-none d-xl-block" /> cut.Proin tempus elit a
                laoreet volut pat.{" "}
              </p>
              <div className="content-section-01__button-group">
                <a href="https://www.apple.com/app-store/">
                  <img src="./image/home-1/app-store.png" alt="sponsor" />
                </a>
                <a href="https://play.google.com/">
                  <img src="./image/home-1/play-store.png" alt="sponsor" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="section-shape transform-origin-top-right"
        data-aos-delay={200}
        data-aos-duration={1000}
        data-aos="zoom-in"
      >
        <img
          src="./image/home-1/content-shape-03.svg"
          alt="mobile-shape"
          className="make-it-inline fill-tertiary w-100 "
        />
      </div>
    </div>
  );
};

export default ContentSection;
