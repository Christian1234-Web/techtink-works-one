import React from "react";
import WidgetCounter from "~components/lib/Widget/WidgetCounter/WidgetCounter";
import data from "./data";
const FactSection = () => {
  return (
    <div className="counter-section-01 bg-default">
      <div className="container">
        <div className="row justify-content-center widgets-row-02">
          {data.map(({ colorClass, title, text, id }) => {
            return (
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6"
                key={id}
              >
                <WidgetCounter
                  className="widget-column-center widget-counter-lg"
                  titleClass={colorClass}
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
