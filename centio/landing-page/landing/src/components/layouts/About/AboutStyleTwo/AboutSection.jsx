import React from "react";
import { ReactSVG } from "react-svg";
import AboutCard from "~components/lib/Card/AboutCard/AboutCard";

const AboutSection = () => {
  return (
    <div className="about-section-02">
      <div className="about-section-02__shape">
        <ReactSVG
          src="./image/home-5/shape-right.svg"
          alt="shape"
          className="w-100 make-it-inline"
        />
      </div>
      <div className="container">
        <div className="row align-items-center text-lg-start text-center justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9 col-sm-10 col-xs-11">
            <div className="row align-items-center justify-content-center">
              <div className="col-xl-6 col-lg-12 col-md-12">
                <div className="row">
                  <div className="col-xl-12 col-md-6">
                    <AboutCard
                      image="./image/home-5/about-icon-1.svg"
                      title="Flexible Classes"
                      text="With lots of unique blocks you can easily create a page without coding with Custer"
                    />
                  </div>
                  <div className="col-xl-12 col-md-6">
                    <AboutCard
                      image="./image/home-5/about-icon-2.svg"
                      title="Education Support"
                      text="With lots of unique blocks you can easily create a page without coding with Custer"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="row">
                  <div className="col-xl-12">
                    <AboutCard
                      image="./image/home-5/about-icon-3.svg"
                      title="Download Classes"
                      text="With lots of unique blocks you can easily create a page without coding with Custer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 offset-xl-1 col-md-9 col-sm-10 col-xs-11"
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="about-section-02__content block-title">
              <h6 className="subtitle text-secondary mb-20">About Custer </h6>
              <h2 className="title">
                Our goal is to make online education work for everyone
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor integer congue magna at
                pretium purus pretium ligula rutrum luctus risus
              </p>
              <a href="#" className="btn btn-primary">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
