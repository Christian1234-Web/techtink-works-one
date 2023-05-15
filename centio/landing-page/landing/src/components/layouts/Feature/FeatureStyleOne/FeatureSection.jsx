import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn/Widget";
import data from "./data";
const FeatureSection = () => {
  return (
    <div className="feature-section-01">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-7 col-lg-7 col-md-9 col-xs-11 text-center">
            <div className="section-title">
              <h2 className="title">
                A simple, proven way to boost your team performance.
              </h2>
              <p className="text-dark">
                Fully layered dolor sit amet, consectetur Facere, nobis, id{" "}
                <br className="d-none d-lg-block" /> expedita dolores officiis
                laboriosam.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row justify-content-center justify-content-lg-start feature-widgets-row-02">
              {data.map(({ id, text, title, icon }, index) => {
                return (
                  <div
                    className="col-lg-4 col-md-5 col-sm-6 col-xs-8"
                    data-aos="fade-up"
                    data-aos-delay={200 * index}
                    data-aos-duration="1000"
                    key={id}
                  >
                    <WidgetColumn
                      text={text}
                      title={title}
                      iconImage={icon}
                      className="widget-feature-01 icon-sizeY-68 text-center text-lg-start"
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

export default FeatureSection;
