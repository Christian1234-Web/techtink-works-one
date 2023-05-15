import React from "react";
import { Link } from "~components/Core";

const Account = ({
  children,
  title,
  column = "col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-xs-11 col-sm-10",
  className = "signin-section-01",
}) => {
  return (
    <div className={className}>
      <div className="container">
        <div className="row justify-content-center">
          <div className={column}>
            <div className="signin-section-01__logo text-center">
              <Link to="/">
                <img src="./image/logo/logo-dark.png" alt="logo" />
              </Link>
            </div>
            <div className="signin-form-01 block-title">
              <h3 className="title signin-form-01__title">{title}</h3>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
