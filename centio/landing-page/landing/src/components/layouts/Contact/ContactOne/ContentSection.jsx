import React from "react";

const ContentSection = () => {
  return (
    <>
      <div className="contactform-section-01">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-4 col-lg-4 col-md-8 mb-mobile-lg">
              <div className="contactform-section-01__sidebar">
                <h4 className="title">Contact Details</h4>
                <div className="contactform-section-01__sidebar--body">
                  <div className="address">
                    <h6 className="address--title">Office Address</h6>
                    <div className="address__box">
                      <div className="icon">
                        <img
                          src="./image/contact/small-map-icon.svg"
                          alt="map-icon"
                        />
                      </div>
                      <span>
                        2118 Thornridge Cir. Syracuse, <br /> California 208434
                      </span>
                    </div>
                  </div>
                  <div className="info">
                    <h6 className="info--title">Contact Info</h6>
                    <ul className="info__box m-0 p-0">
                      <li className="info__box--lists">
                        <i className="fas fa-phone-alt" />
                        <a href="#">+8 (123) 985 789</a>
                      </li>
                      <li className="info__box--lists">
                        <i className="fas fa-envelope" />
                        <a href="mailto:metax@gamil.com"> metax@gamil.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-7 offset-xl-1 col-lg-8 col-md-10">
              <div className="contactform-section-01__from">
                <form className="contact-form-01">
                  <div className="contact-form-01--inpute-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter your name*"
                    />
                  </div>
                  <div className="contact-form-01--inpute-group">
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
                    className="btn btn-primary btn-primary-hvr"
                    type="button"
                    defaultValue="Send Message"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contactmap-section">
        <div className="container-fluid g-0">
          <div className="contactmap-section__map">
            <img src="./image/contact/map.png" className="w-100" alt="map" />
            <div className="contactmap-section__map--icon">
              <img src="./image/contact/map-icon.svg" alt="map-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentSection;
