import React from "react";
import PortfolioSlider from "~components/lib/Slider/PortfolioDetailsTwo";
const ContentSection = () => {
  return (
    <div className="protfoliocontent-section-03">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="protfoliocontent-section-03__image">
              <img
                src="./image/portfolio/p-slider-1.png"
                alt="portfolio-image"
                className="mw-100"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="protfoliocontent-card--03">
              <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-5 mb-mobile-lg">
                  <div className="protfoliocontent-card--03__content">
                    <h3 className="title mb-20">Project Info:</h3>
                    <p className="text-dark text">
                      By accessing and placing an order with UX Theme, you
                      confirm that you are in greement with and bound by the
                      terms and conditions contained in the Terms Of Use
                      outlined elow.entire website and any emailommunication
                      between you and UXTheme. Use outlined elow entire website
                      email.{" "}
                    </p>
                    <div className="protfoliocontent-section-03__next-prev-button">
                      <a href="#" className="prev-button">
                        <i className=" me-2 fas fa-chevron-left" />
                        <p>Previous Project</p>
                      </a>
                      <a href="#" className="next-button">
                        <p>Next Project</p>
                        <i className="ms-2 fas fa-chevron-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 offset-xl-1 col-lg-7">
                  <ul className="protfoliocontent-card--03__list">
                    <li className="list-item">
                      <h6>Client:</h6>
                      <span>Calvin Carlo Industries.</span>
                    </li>
                    <li className="list-item">
                      <h6>Finshing Date:</h6>
                      <span>06 May, 2021</span>
                    </li>
                    <li className="list-item">
                      <h6>Category:</h6>
                      <span>Calvin Carlo Industries.</span>
                    </li>
                    <li className="list-item">
                      <h6>Duration:</h6>
                      <span>2 weeks</span>
                    </li>
                    <li className="list-item">
                      <h6>Website:</h6>
                      <a href="#">www.yourdomain.com</a>
                    </li>
                    <li className="list-item">
                      <h6>Share on:</h6>
                      <ul className="social">
                        <li>
                          <a href="https://www.instagram.com/">
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="protfoliocontent-section-03__slider-small">
              <div className="section-title content-title">
                <h2 className="title">Realted Projects</h2>
              </div>
              <div className="protfoliocontent-section-03__slider">
                <PortfolioSlider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentSection;
