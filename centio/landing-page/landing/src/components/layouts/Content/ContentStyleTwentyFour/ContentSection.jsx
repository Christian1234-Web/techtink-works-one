import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-19 content-section-19--2">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-5 offset-xl-2 col-lg-6 col-md-8 col-sm-10 col-xs-11 order-lg-2">
            <div className="content-section-19__image-group">
              <img
                src="./image/about/content-1.png"
                alt="content-img"
                className="mw-100"
              />
              <div className="content-section-19__image-group--card">
                <img
                  src="./image/about/content-1-card.png"
                  alt="image-card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-xs-11 order-lg-1">
            <div className="block-title content-section-19__content">
              <h2 className="title">Custer manage and grow your business</h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum
                <br className="d-none d-xs-block" /> porta justo integer at odio
                velna vitae auctor integer congue{" "}
              </p>
              <ul className="content-section-19__content--list">
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Boost SEO
                </li>
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Manage Buying
                </li>
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Visual Reviews
                </li>
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Buyer Protection
                </li>
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Social Sharing
                </li>
                <li>
                  <img
                    src="./image/about/check.svg"
                    className="make-it-inline"
                    alt="check"
                  />{" "}
                  Virtual Card
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
