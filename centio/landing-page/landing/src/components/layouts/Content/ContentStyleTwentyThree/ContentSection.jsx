import React from "react";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";
import data from "./data";
const ContentSection = () => {
  return (
    <div className="content-section-23">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-7 col-xs-10 col-sm-10 order-lg-2">
            <div
              className="content-section-23__image-group mb-mobile-lg"
              data-aos="fade-left"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-10/content-2.png"
                alt="content-img"
                className="mw-100"
              />
              <div className="content-section-23__image-group--shape">
                <img
                  src="./image/home-10/content-2-shape.svg"
                  className="w-100"
                  alt="shape"
                />
              </div>
              <div className="content-section-23__image-group--m-1 floating-Y-animation-reverse">
                <img
                  src="./image/home-10/m-1.png"
                  className="w-100"
                  alt="card"
                />
              </div>
              <div className="content-section-23__image-group--m-2 floating-Y-animation">
                <img
                  src="./image/home-10/m-2.png"
                  className="w-100"
                  alt="card"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-9 col-11">
            <div
              className="block-title content-section-23__content"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <h6 className="subtitle text-secondary mb-20">
                Awesome software
              </h6>
              <h2 className="title">
                Receive and send emails on the same page
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum{" "}
                <br className="d-none d-xl-block" />
                porta justo integer at odio velna vitae auctor integer
              </p>
            </div>
            <div className="row content-section-23__widget">
              {data.map(({ title, iconImage, text, id }) => {
                return (
                  <WidgetNormal
                    className="widget-content widget-column-till-md"
                    iconImage={iconImage}
                    title={title}
                    text={text}
                    key={id}
                  />
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
