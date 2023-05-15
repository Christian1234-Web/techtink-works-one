import React from "react";
import WidgetColumn from "~components/lib/Widget/WidgetColumn";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="feature-section-07">
      <div className="container">
        <div className="row justify-content-center">
          <div className="section-title text-center">
            <h6 className="subtitle text-secondary mb-20">Features</h6>
            <h2 className="title">
              Custer email marketing
              <br className="d-none d-xs-block" /> core features
            </h2>
          </div>
        </div>
        <div className="row justify-content-center justify-content-sm-start feature-widgets-row-02">
          {data.map(({ id, iconImage, text, title }, index) => {
            return (
              <div
                className="col-lg-4 col-md-6 col-sm-8 col-xs-8"
                data-aos="fade-up"
                data-aos-delay={300 * index}
                data-aos-duration="1000"
                key={id}
              >
                <a href="#">
                  <WidgetColumn
                    className="feature-section-07__card"
                    iconImage={iconImage}
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
