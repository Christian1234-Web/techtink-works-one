import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const AboutSection = () => {
  return (
    <div className="about-section-06">
      <div
        className="about-section-06__shape"
        data-aos="fade-right"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img
          src="./image/home-9/section-shape-2.svg"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-xl-5 col-lg-6 col-md-8 col-xs-10 col-sm-11"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title about-section-06__content mb-mobile-lg">
              <h6 className="subtitle text-blue mb-20">About Custer </h6>
              <h2 className="title">
                Custer is a platform that gives you many solutions quickly
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta{" "}
                <br className="d-none d-xl-block" /> justo integer at odio velna
                vitae auctor integer congue{" "}
              </p>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-6 offset-xl-1 col-lg-6">
            <div className="row justify-content-center widgets-row about-section-06__card-group">
              {data.map(({ icon, title, text }, index) => {
                return (
                  <div
                    className="col-xl-6 col-lg-6 col-sm-6 col-xs-6 col-11"
                    data-aos="fade-up"
                    data-aos-delay={200 * index}
                    data-aos-duration="1000"
                    key={index + "abtmp"}
                  >
                    <WidgetNormal
                      className="widget-card"
                      iconImage={icon}
                      title={title}
                      text={text}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
