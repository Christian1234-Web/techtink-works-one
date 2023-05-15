import React from "react";
import { Link, PageWrapper } from "~components/Core";
import AccountLayoutOne from "~components/layouts/Account/AccountLayoutTwo";

export default function SignUpTwo() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-1",
        header: false,
        footerHide: true,
      }}
    >
      <AccountLayoutOne
        className="signup-section-02"
        title="Create your account"
        image="./image/account/signup-2.png"
      >
        <form action="#" className="from">
          <div className="from__input-group">
            <label
              htmlFor="username"
              className="from__input-group--label text-dark"
            >
              Your name*
            </label>
            <input
              className="from__input-group--input"
              type="text"
              placeholder="Full name"
              name="username"
              id="username"
              autoComplete="off"
            />
          </div>
          <div className="from__input-group">
            <label
              htmlFor="useremail"
              className="from__input-group--label text-dark"
            >
              Enter email address*
            </label>
            <input
              className="from__input-group--input"
              type="text"
              placeholder="Enter email address"
              name="username"
              id="useremail"
              autoComplete="off"
            />
          </div>
          <div className="from__input-group">
            <label
              htmlFor="confirmemail"
              className="from__input-group--label text-dark"
            >
              Confirm email
            </label>
            <input
              className="from__input-group--input"
              type="text"
              placeholder="Enter email address"
              name="username"
              id="confirmemail"
              autoComplete="off"
            />
          </div>
          <div className="from__input-group">
            <label
              htmlFor="passField"
              className="from__input-group--label text-dark"
            >
              Password*
            </label>
            <div className="from__pass-box">
              <input
                className="from__input-group--input from__pass-box--input"
                id="passField"
                type="password"
                placeholder="**********"
              />
              <i id="eye" className="from__pass-box--eye far fa-eye-slash" />
            </div>
          </div>
          <div className="from__input-group">
            <label
              htmlFor="passField-02"
              className="from__input-group--label text-dark"
            >
              Confirm password
            </label>
            <div className="from__pass-box">
              <input
                className="from__input-group--input from__pass-box--input"
                id="passField-02"
                type="password"
                placeholder="**********"
              />
            </div>
          </div>
          <div className="from__check">
            <h6 className="from__check--title text-dark">
              Terms &amp; Conditions
            </h6>
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I agree with the terms &amp; conditions
            </label>
          </div>
          <div className="from__button-group">
            <div className="from__button-group--one">
              <button className="btn btn-primary btn-primary-hvr" href="#">
                Create Your Account
              </button>
            </div>
            <div className="from__button-group--two">
              <span className="account-btn text-dark">
                Already have an account?
              </span>
              <Link className="createanaccout-btn" to="/sign-in-2">
                Sign in now
              </Link>
            </div>
          </div>
        </form>
      </AccountLayoutOne>
    </PageWrapper>
  );
}
