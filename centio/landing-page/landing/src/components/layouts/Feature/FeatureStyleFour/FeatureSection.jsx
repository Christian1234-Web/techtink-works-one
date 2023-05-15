import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal/Widget";
import data from "./data";
const FeatureSection = () => {
  return (
    <div className="feature-section-04">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-xs-10 col-sm-11 col-md-8 col-lg-12">
            <div className="row align-items-start justify-content-sm-start">
              <div className="col-xxl-6 offset-xxl-2 col-xxl-6 offset-xxl-1 col-lg-6 col-md-9 col-sm-10 col-xs-11 order-lg-2">
                <div className="feature-section-04__image-group text-lg-center mb-mobile-lg">
                  <img src="./image/home-4/feature.png" alt="content-img" />
                  <div className="feature-section-04__image-group--shape shape-x-1">
                    <img
                      src="./image/home-4/feature-shape-1.svg"
                      alt="shape"
                      className="make-it-inline"
                    />
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-12 col-xs-11">
                <div
                  className="block-title widget-content"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <h6 className="subtitle text-secondary mb-20">
                    Why choose us
                  </h6>
                  <h2 className="title">
                    We offer great <br className="d-nome d-xs-block" /> features
                    in Custer
                  </h2>
                  <p className="text-dark">
                    Vero homero perfecto mei ut, sonet aperiam an nec. Me vita
                    haeo tibi que com titure viset cut.Proin tempus.{" "}
                  </p>
                </div>
                <div className="row feature-section-04__widget widgets-row-02">
                  {data.map(
                    ({ id, text, title, iconImage, iconWrapperClass }) => {
                      return (
                        <div
                          className="col-xl-12 col-lg-12 col-md-12 col-sm-6 col-xs-12 order-lg-1"
                          data-aos="fade-up"
                          data-aos-duration="800"
                          key={id}
                        >
                          <WidgetNormal
                            text={text}
                            title={title}
                            iconImage={iconImage}
                            iconWrapperClass={iconWrapperClass}
                            className="widget-content widget-column-till-md"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
