import React from "react";
import WidgetCounter from "~components/lib/Widget/WidgetCounter/WidgetCounter";
import dataDefault from "./data";
const FactSection = ({ data = dataDefault, className, widgetMode }) => {
  return (
    <div className="counter-section-09">
      <div className="counter-section-09__bg-shape">
        <img src="./image/home-9/fact-bg.png" alt="bg" />
      </div>
      <div className="container">
        <div className="row justify-content-center widgets-row-02">
          {data.map(({ title, text, id }) => {
            return (
              <div
                className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-6 col-12"
                key={id}
              >
                <WidgetCounter
                  className="widget-column-center widget-counter"
                  titleClass="text-green"
                  title={title}
                  text={text}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FactSection;
