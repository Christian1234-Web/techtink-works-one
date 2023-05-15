import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn";
import data from "./data";
const ServiceSection = () => {
  return (
    <div className="service-section-01 service-section-01--2">
      <div className="service-section-01--2__shape-1">
        <img src="./image/service/shape.svg" alt="shape" className="w-100" />
      </div>
      <div className="service-section-01--2__shape-2">
        <img src="./image/service/dots.svg" alt="shape" className="w-100" />
      </div>
      <div className="container">
        <div className="row">
          <div className="section-title text-center">
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
          {data.map(({icon, text, title }, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-8"
                data-aos="fade-up"
                data-aos-delay={300 * index}
                data-aos-duration="1000"
                key={index}
              >
                <a href="#">
                  <WidgetColumn
                    className="service-section-01__card service-section-01--2__card"
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

export default ServiceSection;
