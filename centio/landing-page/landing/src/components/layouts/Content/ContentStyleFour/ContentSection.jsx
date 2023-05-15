import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="content-section-04">
      <div className="scetion-shape">
        <img
          src="./image/home-2/section-shape-2.png"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-8 col-xs-11">
            <div className="content-texts block-title text-center text-lg-start">
              <h6 className="subtitle text-primary">How It Works</h6>
              <h2 className="title ">
                Acceleration process to <br className="d-none d-xl-block" />{" "}
                grow your business.
              </h2>
              <p className="text-dark">
                There are many scenarios that could result in initiated attacks.
                <br className="d-none d-xl-block" />
                These can be an giving away login credentials.
              </p>
              <a href="#" className="btn btn-secondary btn-secondary-hvr">
                Live Demo
              </a>
            </div>
          </div>
          <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-10 col-xs-10">
            <div className="row justify-content-center content-section-04__widget">
              {data.map(({ id, iconText, text, title }) => {
                return (
                  <div
                    className="col-lg-12 col-sm-6 col-10"
                    data-aos="fade-up"
                    data-aos-delay={200 * id}
                    data-aos-duration="1000"
                    key={id}
                  >
                    <WidgetNormal
                      className="widget-content--02 widget-column-till-md"
                      iconText={iconText}
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
    </div>
  );
};

export default ContentSection;
