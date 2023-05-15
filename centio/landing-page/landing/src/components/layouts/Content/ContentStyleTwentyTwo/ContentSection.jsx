import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-22">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-xl-6 col-lg-6 col-md-7 col-xs-10 col-sm-10"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-22__image-group mb-mobile-lg">
              <img
                src="./image/home-10/content-1.png"
                alt="content-image"
                className="mw-100"
              />
              <div className="content-section-22__image-group--shape">
                <img
                  src="./image/home-10/content-1-shape.svg"
                  alt="card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 offset-xxl-2  offset-lg-1 col-lg-5 col-md-7 col-xs-9 col-sm-8">
            <div className="block-title content-section-22__content">
              <h6 className="subtitle text-secondary mb-20">
                Totally optimized
              </h6>
              <h2 className="title">
                Build your email list easily with Custer
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor
              </p>
              <ul className="content-section-22__content--list">
                <li>
                  <div className="icon">
                    <img
                      src="./image/home-10/icon-check.svg"
                      className="make-it-inline"
                      alt="check"
                    />
                  </div>
                  <span> Easily create email inbox lists</span>
                </li>
                <li>
                  <div className="icon">
                    <img
                      src="./image/home-10/icon-check.svg"
                      className="make-it-inline"
                      alt="check"
                    />
                  </div>
                  <span>Saves time and makes work easier</span>
                </li>
                <li>
                  <div className="icon">
                    <img
                      src="./image/home-10/icon-check.svg"
                      className="make-it-inline"
                      alt="check"
                    />
                  </div>
                  <span> Information can be easily exchanged</span>
                </li>
              </ul>
              <a className=" btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
