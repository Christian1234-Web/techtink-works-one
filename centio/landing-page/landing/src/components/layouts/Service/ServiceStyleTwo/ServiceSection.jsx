import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="service-section-02">
      <div className="container">
        <div className="row">
          <div className="section-title text-center">
            <h6 className="subtitle text-secondary mb-20">Try our services</h6>
            <h2 className="title">
              Get the best caring <br className="d-none d-xs-block" />{" "}
              facilities for everyone
            </h2>
            <p className="text-dark">
              {" "}
              An enim nullam tempor sapien gravida donec enim{" "}
              <br className="d-none d-xs-block" /> a vitae auctor integer congue{" "}
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
                    className="service-section-02__card"
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
