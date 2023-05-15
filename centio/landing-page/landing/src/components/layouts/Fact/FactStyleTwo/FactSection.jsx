import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn";
import dataDefault from "./data";
const FactSection = ({
  data = dataDefault,
  className,
  widgetMode = "light",
}) => {
  return (
    <div className={`counter-section-02${className ? " " + className : ""}`}>
      <div className="container">
        <div className="row justify-content-center widgets-row-02">
          {data.map(({ title, text, id, iconImage }) => {
            return (
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6"
                key={id}
              >
                <WidgetColumn
                  className="widget-column-center widget-counter"
                  title={title}
                  text={text}
                  iconImage={iconImage}
                  titleClass={` ${
                    widgetMode === "light"
                      ? "heading-light"
                      : widgetMode === "dark"
                      ? "heading-dark"
                      : ""
                  }`}
                  textClass={
                    widgetMode === "light"
                      ? "text-light"
                      : widgetMode === "dark"
                      ? "text-dark"
                      : ""
                  }
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
