import React from "react";
import FeatureWidget from "~components/lib/Widget/WidgetStyleOne";
import data from "./data.json";
const FeatureSection = () => {
  return (
    <section className="feature-section-03">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-9 col-xs-10">
            <div className="section-title text-center">
              <h2 className="title">
                Custer has lots of special features for you
              </h2>
              <p>
                Fully layered dolor sit amet, consectetur Facere, nobis, id{" "}
                <br className="d-none d-md-block" /> expedita dolores officiis
                laboriosam.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center feature-widgets-row">
          {data.map(({ icon, title, text, align, id }) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-10 col-xs-10"
                data-aos="fade-up"
                data-aos-delay={200 * id}
                data-aos-duration="1000"
                key={id + "f01"}
              >
                <FeatureWidget
                  icon={icon}
                  title={title}
                  text={text}
                  align={align}
                  className="widget-card-01"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
