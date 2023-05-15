import React from "react";
import { Link, PageWrapper } from "~components/Core";
import AccountLayoutOne from "~components/layouts/Account/AccountLayoutOne";

export default function SignInOne() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-1",
        innerPage:false,
        header: false,
        footerHide: true,
      }}
    >
      <AccountLayoutOne title="Login to you account">
        <form action="#" className="from">
          <div className="from__input-group">
            <label
              htmlFor="username"
              className="from__input-group--label text-dark"
            >
              Enter email address*
            </label>
            <input
              className="from__input-group--input"
              type="text"
              placeholder="Enter email address"
              name="username"
              id="username"
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
          <div className="from__check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
            />
            <label className="form-check-label" id="check" htmlFor="gridCheck">
              Remember me
            </label>
          </div>
          <div className="from__button-group">
            <div className="from__button-group--one">
              <button className="btn btn-primary btn-primary-hvr">
                Login Now
              </button>
              <a className="forgot-btn text-dark" href="#">
                Forgot password?
              </a>
            </div>
            <div className="from__button-group--two">
              <span className="account-btn text-dark">
                Don’t have an account?
              </span>
              <Link className="createanaccout-btn" to="/sign-up-1">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </AccountLayoutOne>
    </PageWrapper>
  );
}
