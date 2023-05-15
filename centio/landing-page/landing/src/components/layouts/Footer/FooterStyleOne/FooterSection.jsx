import React from "react";

const FooterInfo = () => {
  return (
    <div className="footer-widget footer-widget--03 text-center text-sm-start">
      <h5 className="footer-widget--title">Our Support Download</h5>
      <ul className="footer-widget--info m-0 p-0 list-unstyled">
        <li>455 West Orchard Street </li>
        <li>Kings Mountain, NC 28086</li>
        <li>
          Phone:
          <a href="#">+8 (123) 985 789</a>
        </li>
        <li>
          Email:
          <a href="#"> metax@gamil.com</a>
        </li>
      </ul>
      <div className="footer-widget--info-brand">
        <a href="https://www.apple.com/app-store/">
          <img
            src="./image/logo/f-app-store.png"
            alt="sponsor"
            className="mw-100"
          />
        </a>
        <a href="https://play.google.com/">
          <img
            src="./image/logo/f-play-store.png"
            alt="sponsor"
            className="mw-100"
          />
        </a>
      </div>
    </div>
  );
};
const FooterDownload = () => {
  return (
    <div className="footer-widget footer-widget--03 text-center text-sm-start">
          <h5 className="footer-widget--title">Contact Info</h5>
          <ul className="footer-widget--info m-0 p-0 list-unstyled">
            <li>455 West Orchard Street </li>
            <li>Kings Mountain, NC 28086</li>
            <li className="footer-2-datails">
              <i className="fas fa-phone-alt" />
              <a href="#">+8 (123) 985 789</a>
            </li>
            <li className="footer-2-datails">
              <i className="fas fa-envelope" />
              <a href="#"> metax@gamil.com</a>
            </li>
          </ul>
        </div>
  );
};

export default function FooterSection({ type }) {
  return (
    <footer className="footer-area--01">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-xl-3 col-xxl-3 col-sm-6 col-xs-9 col-10 order-sm-1 order-lg-1">
            <div className="footer-content text-center text-sm-start">
              <a href="index.html" className="footer-content--logo d-block">
                <img src="./image/logo/logo-dark.png" alt="logo" />
              </a>
              <p className="footer-content--text text-dark">
                There are many variations of passages of Lorem the Ipsum
                available but it is the majority of suffered that a alteration
                in that some dummy text.
              </p>
              <ul className="footer-content--social">
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
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-xxl-3 col-sm-4 col-xs-11 offset-sm-1 offset-lg-0 order-sm-2 order-lg-2">
            <div className="footer-widget footer-widget--01 text-center text-sm-start">
              <h5 className="footer-widget--title">Services</h5>
              <ul className="footer-widget--list m-0 p-0 list-unstyled">
                <li>
                  <a href="/#">Incident Responder</a>
                </li>
                <li>
                  <a href="/#">Secure Managed IT</a>
                </li>
                <li>
                  <a href="/#">Check website Url</a>
                </li>
                <li>
                  <a href="/#">Locker Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-xxl-3 col-sm-4 col-xs-11 offset-sm-1 offset-lg-0 order-sm-4 order-lg-3">
            <div className="footer-widget footer-widget--02 text-center text-sm-start">
              <h5 className="footer-widget--title">About Us</h5>
              <ul className="footer-widget--list m-0 p-0 list-unstyled">
                <li>
                  <a href="/#">Payment Plans</a>
                </li>
                <li>
                  <a href="/#">Make saving More</a>
                </li>
                <li>
                  <a href="/#">Tax Calculator</a>
                </li>
                <li>
                  <a href="/#">Talk To Us</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-xxl-3 col-sm-6 col-xs-11 order-sm-3 order-lg-4">
            {type === "info" ? <FooterInfo/> : <FooterDownload/>}
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <p>© 2021 Custer All Rights Reserved.</p>
      </div>
    </footer>
  );
}
