import React from "react";
import { PageWrapper } from "~components/Core";
import Countdown from "~components/lib/Countdown";

export default function ComingSoonOne() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-1",
        header: false,
        footerHide: true,
      }}
    >
      <div className="comingsoon-section-01">
        <div className="comingsoon-section-01__shape-1 floating-Y-animation-02">
          <img
            src="./image/comingsoon/shape-1.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-01__shape-2 circle-animation">
          <img
            src="./image/comingsoon/shape-2.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-01__shape-3  floating-Y-animation-reverse-02">
          <img
            src="./image/comingsoon/shape-3.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="comingsoon-section-01__shape-4 circle-animation">
          <img
            src="./image/comingsoon/shape-4.svg"
            className="w-100 make-it-inline"
            alt="shape"
          />
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="comingsoon-section-01__logo text-center">
              <a href="index.html">
                <img src="./image/logo/logo-white.png" alt="logo" />
              </a>
            </div>
            <div className="comingsoon-section-01__content text-center">
              <div className="comingsoon-section-01__content--title block-title">
                <h2 className="title text-white mb-20">Coming Soon</h2>
                <p className="text-light">
                  Get ready for the biggest marketing <br /> launch of the year
                </p>
              </div>
              <Countdown />
              <form className="comingsoon-section-01__content--notify-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your email and get notified"
                  />
                  <div className="arrow">
                    <img
                      src="./image/icons/icon-arrow-rigth.svg"
                      className="make-it-inline"
                      alt="icon-arrow"
                    />
                  </div>
                </div>
              </form>
              <ul className="comingsoon-section-01__content--social">
                <li>
                  <a target="_blank" href="https://www.instagram.com/">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
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
