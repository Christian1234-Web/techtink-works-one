import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="service-section-01">
      <div
        className="service-section-01__shape"
        data-aos="fade-right"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <img
          src="./image/home-6/service-shape.svg"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="section-title text-center">
            <h6 className="subtitle text-secondary ">Services</h6>
            <h2 className="title">
              The most useful services <br className="d-none d-xs-block" /> for
              your business
            </h2>
            <p className="text-dark">
              An enim nullam tempor sapien gravida donec enim ipsum{" "}
              <br className="d-none d-xs-block" /> porta justo integer at odio
              velna vitae auctor integer.
            </p>
          </div>
        </div>
        <div className="row justify-content-center justify-content-sm-start feature-widgets-row">
          {data.map(({ id, icon, text, title }, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-8"
                data-aos="fade-up"
                data-aos-delay={300 * index}
                data-aos-duration="1000"
                key={id}
              >
                <a href="#">
                  <WidgetColumn
                    className="service-section-01__card"
                    iconImage={icon}
                    title={title}
                    text={text}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
