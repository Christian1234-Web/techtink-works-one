import React from "react";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-18">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-6 col-lg-6 col-md-10 col-xs-10 col-sm-10"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-18__image-group mb-mobile-lg">
              <img
                src="./image/home-8/content-2.png"
                alt="content-image"
                className="mw-100"
              />
              <div className="content-section-18__image-group--card">
                <img
                  src="./image/home-8/content-2-card.png"
                  alt="card"
                  className="w-100"
                />
              </div>
              <div className="content-section-18__image-group--shape two-way-circle">
                <ReactSVG
                  src="./image/home-8/content-2-shape.svg"
                  alt="card"
                  className="react-svg-w-100 make-it-inline"
                />
              </div>
              <div
                className="content-section-18__image-group--dotst"
                data-aos="fade-left"
                data-aos-delay={1300}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-8/content-2-dots.svg"
                  alt="card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-10 col-xs-10 col-sm-10">
            <div
              className="block-title content-section-18__content"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <h6 className="subtitle text-secondary  mb-20">
                We made it simple
              </h6>
              <h2 className="title">
                Quality healthcare starts with one click easily
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum{" "}
                <br className="d-none d-xl-block" /> porta justo integer at odio
                velna vitae auctor integer congue
              </p>
              <ul className="content-section-18__content--list">
                <li>
                  <img src="./image/home-8/check.svg" alt="check" />
                  Call, video chat or message a doctor
                </li>
                <li>
                  <img src="./image/home-8/check.svg" alt="check" />
                  Insurance not required
                </li>
                <li>
                  <img src="./image/home-8/check.svg" alt="check" />
                  Prescription pick-up at your preferred pharmacy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
