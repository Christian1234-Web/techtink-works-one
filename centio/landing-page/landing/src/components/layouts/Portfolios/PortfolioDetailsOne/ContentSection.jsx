import React from "react";

const ContentSection = () => {
  return (
    <div className="protfoliocontent-section-01">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="protfoliocontent-section-01__image-group">
              <div className="protfoliocontent-section-01__image-group--single">
                <img
                  src="./image/portfolio/p-1.png"
                  alt="portfolio-image"
                  className="w-100"
                />
              </div>
              <div className="protfoliocontent-section-01__image-group--single">
                <img
                  src="./image/portfolio/p-2.png"
                  alt="portfolio-image"
                  className="w-100"
                />
              </div>
              <div className="protfoliocontent-section-01__image-group--single">
                <img
                  src="./image/portfolio/p-3.png"
                  alt="portfolio-image"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="protfoliocontent-card--01">
              <h3 className="title mb-20">Project Info:</h3>
              <p className="text-dark text">
                By accessing and placing an order with UX Theme, you confirm
                that you are in greement with and bound by the terms and
                conditions contained in the Terms Of Use outlined elow.entire
                website and any emailommunication between you and UXTheme. Use
                outlined elow entire website email.{" "}
              </p>
              <ul className="protfoliocontent-card--01__list">
                <li className="list-item">
                  <h6>Client:</h6>
                  <span>Calvin Carlo Industries.</span>
                </li>
                <li className="list-item">
                  <h6>Category:</h6>
                  <span>Calvin Carlo Industries.</span>
                </li>
                <li className="list-item">
                  <h6>Website:</h6>
                  <a href="#">www.yourdomain.com</a>
                </li>
                <li className="list-item">
                  <h6>Finshing Date:</h6>
                  <span>06 May, 2021</span>
                </li>
                <li className="list-item">
                  <h6>Duration:</h6>
                  <span>2 weeks</span>
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
            <div className="protfoliocontent-section-01__next-prev-button">
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
      </div>
    </div>
  );
};
export default ContentSection;
