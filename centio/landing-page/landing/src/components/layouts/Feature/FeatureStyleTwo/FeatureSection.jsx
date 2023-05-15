import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data.json";
const FeatureSection = () => {
  return (
    <section className="feature-section-02">
      <div className="container">
        <div className="row feature-widgets-row-02 justify-content-center">
          {data.map(({title,icon,text,id})=>{return(
            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-8 col-xs-9" key={id}>
              <WidgetNormal iconImage={icon} text={text} title={title} className="widget-feature-02 widget-column-till-md text-center text-md-start"/>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
