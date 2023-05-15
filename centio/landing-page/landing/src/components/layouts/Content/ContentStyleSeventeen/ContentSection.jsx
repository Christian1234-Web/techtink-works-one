import React from "react";
import { ReactSVG } from "react-svg";
import WidgetNormal from "~components/lib/Widget/WidgetNormal";

const ContentSection = () => {
  return (
    <div className="content-section-17">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div
            className="col-xl-6 offset-xl-1 col-lg-6 col-md-9 col-11 order-lg-2"
            data-aos="fade-left"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-17__image-group mb-mobile-lg">
              <img
                src="./image/home-8/content-1.png"
                alt="content-img"
                className="mw-100"
              />
              <div className="content-section-17__image-group--shape-1 two-way-circle">
                <ReactSVG
                  src="./image/home-8/content-round-shape.svg"
                  className="react-shape-w-100 make-it-inline"
                  alt="shape"
                />
              </div>
              <div className="content-section-17__image-group--shape-2">
                <ReactSVG
                  src="./image/home-8/content-1-shape-1.svg"
                  className="react-shape-w-100"
                  alt="shape"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-9 col-11">
            <div
              className="block-title content-section-17__content"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <h6 className="subtitle text-secondary  mb-20">Why choose us</h6>
              <h2 className="title">
                Custer is a great place to receive care at home
              </h2>
              <p className="text-dark">
                Vero homero perfecto mei ut, sonet aperiam an nec.
                <br className="d-nome d-xs-block" /> Me vita haeo tibi que com
                titure viset cut.Proin tempus.{" "}
              </p>
            </div>
            <div className="row content-section-17__widget">
              <div
                className="col-xl-12 col-lg-12 col-md-10 col-sm-6 col-xs-6 col-10 order-lg-1"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <WidgetNormal
                  className="widget-content widget-column-till-md"
                  title="Quality control system"
                  iconImage="./image/home-8/c-icon-2.svg"
                  text="With lots of unique blocks you can easily <br className='d-lg-block d-none'> create a page without coding with Custer"
                />
              </div>
              <div
                className="col-xl-12 col-lg-12 col-md-10 col-sm-6 col-xs-6 col-10 order-lg-1"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <WidgetNormal
                  className="widget-content widget-column-till-md"
                  title="Highly professional team"
                  iconImage="./image/home-8/c-icon-1.svg"
                  text="With lots of unique blocks you can easily <br className='d-lg-block d-none'> create a page without coding with Custer"
                />
              </div>
            </div>
            <div
              className="content-section-17__button"
              data-aos="fade-up"
              data-aos-duration={800}
            >
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
