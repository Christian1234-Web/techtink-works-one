import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const AboutSection = ({ className }) => {
  return (
    <div className="about-section-03">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-xl-6 col-lg-6 col-md-8 col-xs-10 col-sm-10 offset-xl-1 order-lg-2"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="about-section-03__content mb-mobile-lg">
              <div className="block-title content-title">
                <h6 className={`subtitle text-secondary mb-20 ${className}`}>
                  About Custer
                </h6>
                <h2 className="title">
                  We are creating modern <br className="d-none d-xl-block" />
                  &amp; high quality software{" "}
                  <br className="d-none d-xl-block" /> for your business
                </h2>
                <p>
                  An enim nullam tempor sapien gravida donec enim ipsum porta
                  justo <br className="d-none d-xl-block" /> integer at odio
                  velna vitae auctor integer congue magna at pretium{" "}
                </p>
                <a className="btn btn-primary btn-primary-hvr" href="#">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-8 col-xs-10 col-sm-10 order-lg-1">
            <div className="about-section-03__widget">
              {data.map(({ id, iconImage, text, title }, index) => {
                return (
                  <div
                    className="about-section-03__widget--wrapper"
                    data-aos="fade-up"
                    data-aos-delay={200 * index}
                    data-aos-duration="1000"
                    key={id}
                  >
                    <WidgetNormal
                      className="widget-content widget-column-till-md"
                      iconImage={iconImage}
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

export default AboutSection;
