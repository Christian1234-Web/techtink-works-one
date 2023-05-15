import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="content-section-02">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-8 col-sm-10 col-xs-10">
            <div className="content-section-02__image mb-mobile-lg">
              <img
                src="./image/home-1/content-2.png"
                alt="content-img"
                className="w-100"
              />
            </div>
          </div>
          <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-9 col-xs-11">
            <div
              className="block-title text-center text-lg-start"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <h2 className="title">
                Boost productivity <br className="d-none d-lg-block" /> with
                best creativity
              </h2>
              <p className="text-dark">
                Your well-oiled doesn’t have to down due to complex{" "}
                <br className="d-none d-lg-block" /> processes, or lack of time
                to enforce consistency.
              </p>
            </div>
            <div className="row justify-content-center content-section-02__widget">
              {data.map(({ icon , title, text,id }) => {
                return (
                  <div
                    className="col-xl-12 col-lg-12 col-md-10 col-xs-9 col-10"
                    data-aos="fade-up"
                    data-aos-duration={800}
                    key={id}
                  >
                    <WidgetNormal
                      iconImage={icon}
                      title={title}
                      text={text}
                      className="widget-content widget-column-till-md"
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

export default ContentSection;