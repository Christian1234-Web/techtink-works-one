import React from "react";
import WidgetCounter from "~components/lib/Widget/WidgetCounter/WidgetCounter";
import dataDefault from "./data";
const FactSection = ({ data = dataDefault, className, widgetMode }) => {
  return (
    <div className="counter-section-10">
      <div className="container">
        <div className="row justify-content-center widgets-row-02">
          <div
            className="col-xl-4 col-lg-5 mb-mobile-lg"
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <div className="counter-section-10__widget">
              {data.map(({ title, text, id }) => {
                return (
                  <WidgetCounter
                    className="widget-column-center widget-counter"
                    title={title}
                    text={text}
                    key={id}
                  />
                );
              })}
            </div>
          </div>
          <div
            className="col-xl-6 offset-xl-2 col-lg-7 col-md-10 col-xs-11"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title counter-section-10__content text-center text-lg-start">
              <h2 className="title">
                <span>1000+</span> companies trust us with their email marketing
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactSection;
