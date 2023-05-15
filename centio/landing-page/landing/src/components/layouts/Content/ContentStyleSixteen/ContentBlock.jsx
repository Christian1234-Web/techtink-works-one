import React from "react";

export default function ContentBlock() {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-xl-6 col-lg-6 col-md-10 col-sm-10 col-xs-10">
        <div className="content-section-16__image-group mb-mobile-lg">
          <img
            className="w-100"
            src="./image/home-7/content-2.png"
            alt="content"
          />
          <div className="content-section-16__image-group--card">
            <img src="./image/home-7/content-2-card.png" alt="card" />
          </div>
        </div>
      </div>
      <div
        className="col-xl-5 offset-xl-1 col-lg-6 col-md-10  col-sm-10 col-xs-10"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <div className="content-section-16__content block-title">
          <h2 className="title">
            Custer create content that reinforces your SEO goals &amp; business
            model
          </h2>
          <p className="text-dark">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
          <div className="content-section-16__content--button-group">
            <a href="#">
              <img
                src="./image/home-7/appstore.png"
                className="mw-100"
                alt="store"
              />
            </a>
            <a href="#">
              <img
                src="./image/home-7/playstore.png"
                className="mw-100"
                alt="store"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
