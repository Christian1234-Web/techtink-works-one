import React from "react";

const HeaderButtons = ({
  btnWrapperClasses,
  btnOneClasses,
  btnTwoClasses,
  btnOneText,
  btnTwoText,
}) => {
  return (
    <div
      className={`header-button site-header__btns d-flex d-lg-block flex-lg-row flex-column mt-5 mt-lg-0 ${btnWrapperClasses}`}
    >
      <a className={btnOneClasses} href="#">
        {btnOneText}
      </a>
      <a className={btnTwoClasses} href="#">
        {btnTwoText}
      </a>
    </div>
  );
};

export default HeaderButtons;
