import React from "react";
import { Link, PageWrapper } from "~components/Core";
import AccountLayoutOne from "~components/layouts/Account/AccountLayoutOne";

export default function ResetPassword() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-1",
        header: false,
        footerHide: true,
      }}
    >
      <AccountLayoutOne className="reset-section-01" title="Reset password">
      <form action="#" className="from">
  <div className="from__input-group">
    <label htmlFor="username" className="from__input-group--label text-dark"> Email address*</label>
    <input className="from__input-group--input" type="text" placeholder="Enter email address" name="username" id="username" autoComplete="off" />
  </div>
  <div className="from__button-group">
    <div className="from__button-group--one">
      <button className="btn btn-primary btn-primary-hvr" href="#">Send Reset Link</button>
    </div>
    <div className="from__button-group--two">
      <span className="account-btn text-dark">Rememered the password?</span>
      <Link className="createanaccout-btn " to="/sign-in-1">Sign in now</Link>
    </div>
  </div>
</form>

      </AccountLayoutOne>
    </PageWrapper>
  );
}
