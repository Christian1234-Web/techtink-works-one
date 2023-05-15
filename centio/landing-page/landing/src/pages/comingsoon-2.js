import React from "react";
import { PageWrapper } from "~components/Core";
import Countdown from "~components/lib/Countdown";

export default function ComingSoonTwo() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-1",
        header: false,
        footerHide: true,
      }}
    >
      <div className="comingsoon-section-02">
        <div className="comingsoon-section-02__shape">
          <img
            src="./image/comingsoon/coming-soon-2-shape.svg"
            className="w-100 h-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-02__shape-1 floating-Y-animation-02">
          <img
            src="./image/comingsoon/shape-1.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-02__shape-2 circle-animation">
          <img
            src="./image/comingsoon/shape-2.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-02__shape-3  floating-Y-animation-reverse-02">
          <img
            src="./image/comingsoon/shape-3.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-02__shape-4 circle-animation">
          <img
            src="./image/comingsoon/shape-4.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="comingsoon-section-02__logo text-center">
              <a href="index.html">
                <img src="./image/logo/logo-white.png" alt="logo" />
              </a>
            </div>
            <div className="comingsoon-section-02__content text-center">
              <div className="comingsoon-section-02__content--title block-title">
                <h2 className="title text-white mb-20">Coming Soon</h2>
                <p className="text-light">
                  Get ready for the biggest marketing <br /> launch of the year
                </p>
              </div>
              <Countdown className="comingsoon-section-02__content--counter" />
              <ul className="comingsoon-section-02__content--social">
                <li>
                  <a target="_blank" href="https://www.linkedin.com/">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.facebook.com/">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://twitter.com/">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
