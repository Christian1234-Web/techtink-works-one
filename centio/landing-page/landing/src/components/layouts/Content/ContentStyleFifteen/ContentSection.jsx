import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="content-section-15 overflow-hidden">
      <div className="content-section-15__circle-1 particle" />
      <div className="content-section-15__circle-2 particle" />
      <div className="content-section-15__circle-3 particle" />
      <div className="content-section-15__circle-1 particle" />
      <div className="content-section-15__circle-2 particle" />
      <div className="content-section-15__circle-3 particle" />
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-xs-10 col-sm-11">
            <div className="block-title content-section-15__content mb-mobile-lg">
              <h6 className="subtitle text-secondary mb-20">
                Totally optimized
              </h6>
              <h2 className="title">
                Custer provide wide range of effective marketing services
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum{" "}
                <br className="d-none d-xl-block" /> porta justo integer at odio
                velna vitae auctor integer
              </p>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-6 offset-xl-1 col-lg-6">
            <div className="row justify-content-center widgets-row content-section-15__card-group">
              {data.map(({ id, iconImage, text, title }, index) => {
                return (
                  <div
                    className="col-xl-6 col-lg-6 col-sm-6 col-xs-6 col-11"
                    data-aos="fade-up"
                    data-aos-delay={300 * index}
                    data-aos-duration="1000"
                    key={id}
                  >
                    <WidgetNormal
                      className="widget-card"
                      iconImage={iconImage}
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

export default ContentSection;
