import React from "react";
import WidgetCounter from "~components/lib/Widget/WidgetCounter/WidgetCounter";
import fact from "./fact";
import brand from "./brand";
const FactSection = () => {
  return (
    <>
      <div className="brand-section-02 brand-section-modifi--02">
        <div className="container">
          <div className="brand-section-02__wrapper">
            {brand.map(({ src, id }, index) => {
              return (
                <div className="single-brand" key={id + index}>
                  <img src={src} alt="brand" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="counter-section-08">
        <div className="container">
          <div className="counter-section-08__wrapper">
            <div className="row justify-content-center widgets-row-02">
              {fact.map(({ color, text, title }, index) => {
                return (
                  <div
                    className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-6 col-12"
                    key={index}
                  >
                    <WidgetCounter
                      className="widget widget-column widget-column-center widget-counter"
                      textClass={color}
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
    </>
  );
};

export default FactSection;
