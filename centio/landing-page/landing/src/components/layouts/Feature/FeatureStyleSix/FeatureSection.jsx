import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn/Widget";
import data from "./data";
const FeatureSection = () => {
  return (
    <div className="feature-section-06">
      <div className="feature-section-06__shape">
        <img
          src="./image/home-8/feature-section-dots.svg"
          className="w-100"
          alt="shape"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center justify-content-lg-start feature-widgets-row-02">
          {data.map(({ id, text, title, icon }, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-8 col-xs-10"
                data-aos="fade-up"
                data-aos-delay={200 * index}
                data-aos-duration="1000"
                key={id}
              >
                <WidgetColumn
                  text={text}
                  title={title}
                  iconImage={icon}
                  className="feature-section-06__widget-card text-center"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
