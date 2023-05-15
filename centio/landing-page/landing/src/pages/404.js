import React from "react";
import { Link, PageWrapper } from "~components/Core";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--dark site-header--menu-center-adjustment",
  darkLogo: true,
  doubleButton: {
    wrapperClass: "site-header__btns--09",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
};
export default function Error() {
  return (
    <PageWrapper
      themeConfig={{ pageWrapperClass: "theme-1", header: headerConfig }}
    >
      <div className="error-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-md-9 col-xs-11">
              <div className="error-section__img text-center">
                <img src="./image/404.png" alt={404} className="mw-100" />
              </div>
            </div>
            <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-8 col-sm-10 col-xs-11">
              <div className="error-section__content block-title text-center">
                <h2 className="title">Opps! Something Wrong</h2>
                <p className="text-dark m-0">
                  We’re sorry, the page you have looked for does not exist in
                  our database! <br className="d-none d-xxl-block" /> Maybe go
                  to our home page or try to use a search?
                </p>
                <Link className="btn btn-primary btn-primary-hvr" to="/#">
                  Go Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
