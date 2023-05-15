import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-24">
      <div className="content-section-24__shape-1">
        <img src="./image/service/shape.svg" alt="shape" className="w-100" />
      </div>
      <div className="content-section-24__shape-2">
        <img src="./image/service/dots.svg" alt="shape" className="w-100" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4">
            <div className="content-section-24__tab">
              <h4 className="content-section-24__tab--title">Services</h4>
              <div className="nav flex-column nav-pills">
                <button className="nav-link active">Wealth Nuturing</button>
                <button className="nav-link">App Integration</button>
                <button className="nav-link">Steady Growth</button>
                <button className="nav-link">Guarantee of Quality</button>
                <button className="nav-link">Best Email Templates</button>
                <button className="nav-link">Stratagy &amp; Research</button>
                <button className="nav-link">
                  Marketing &amp; Advertising
                </button>
                <button className="nav-link">Boost SEO Ranking</button>
                <button className="nav-link">Daily Reports</button>
              </div>
            </div>
          </div>
          <div className="col-xl-7 offset-xl-1 col-lg-8 col-md-8">
            <div className="content-section-24__tab-content">
              <div className="content-section-24__tab-content--img">
                <img
                  src="./image/service/service-img-1.png"
                  alt="service-img"
                  className="mw-100"
                />
              </div>
              <p className="text-dark text">
                As independent wealth planners, we can work with you in a clear,
                transparent partnership, and offer you objective, comprehensive
                advice.
                <br />
                <br />
                No matter how complex your finances or personal situation, we
                have the expertise and market-leading tools at our disposal to
                provide you with sophisticated and forward-thinking advice,
                tailored precisely to your needs.
                <br />
                <br />
                Your personal wealth adviser will consider your finances as a
                whole to ensure your plans, savings and investments are working
                hard, and harmoniously together, to achieve your objectives both
                now and in the future.
              </p>
              <div className="content-section-24__tab-content--widget">
                <h3 className="title"> Why this service is important?</h3>
                <div className="widget">
                  <div className="widget--icon icon-bg-1">
                    <img
                      src="./image/service/widget-icon-1.svg"
                      className="make-it-inline"
                      alt="widget-icon"
                    />
                  </div>
                  <div className="widget--text">
                    <p className="heading-dark">
                      <span>Investment management:</span> Our expert Investment
                      Managers can run a personalised investment portfolio on
                      your behalf or support you in making your own investment
                      decisions
                    </p>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget--icon icon-bg-2">
                    <img
                      src="./image/service/widget-icon-2.svg"
                      className="make-it-inline"
                      alt="widget-ion"
                    />
                  </div>
                  <div className="widget--text">
                    <p className="heading-dark">
                      <span>personal wealth planning:</span> Our expert
                      Investment Managers can run a personalised investment
                      portfolio on your behalf or support you in making your own
                      investment decisions
                    </p>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget--icon icon-bg-3">
                    <img
                      src="./image/service/widget-icon-3.svg"
                      className="make-it-inline"
                      alt="widget-icon"
                    />
                  </div>
                  <div className="widget--text">
                    <p className="heading-dark">
                      <span>Protect yourself from fraud:</span> Our expert
                      Investment Managers can run a personalised investment
                      portfolio on your behalf or support you in making your own
                      investment decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
