import React from "react";

const ContentSection = () => {
  return (
    <div className="contactform-section-02">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6">
            <div className="contact-card">
              <div className="contact-card__iocn">
                <i className="fas fa-map-marker-alt" />
              </div>
              <div className="contact-card__body">
                <p>
                  2118 Thornridge Cir. Syracuse, <br /> California 208434
                </p>
              </div>
            </div>
            {/* Contact Card End */}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6">
            <div className="contact-card">
              <div className="contact-card__iocn">
                <i className="fas fa-phone-alt" />
              </div>
              <div className="contact-card__body">
                <p>
                  2118 Thornridge Cir. Syracuse, <br /> California 208434
                </p>
              </div>
            </div>
            {/* Contact Card End */}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-6">
            <div className="contact-card">
              <div className="contact-card__iocn">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-card__body">
                <p>
                  2118 Thornridge Cir. Syracuse, <br /> California 208434
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center contactform-section-02__map-form">
          <div className="col-xl-6 col-lg-6 col-md-10 mb-mobile-lg">
            <div className="contactform-section-02__map">
              <img
                src="./image/contact/map-2.png"
                className="w-100"
                alt="map"
              />
              <div className="contactmap-section__map--icon">
                <img src="./image/contact/medium-map-icon.svg" alt="map-icon" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="contactform-section-01__from">
              <form className="contact-form-02">
                <div className="contact-form-02--inpute-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your name*"
                  />
                </div>
                <div className="contact-form-02--inpute-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your email address*"
                  />
                </div>
                <textarea
                  placeholder="Write your message"
                  cols={30}
                  rows={10}
                  defaultValue={""}
                />
                <input
                  className="btn btn-secondary btn-secondary-hvr"
                  type="button"
                  defaultValue="Send Message"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
