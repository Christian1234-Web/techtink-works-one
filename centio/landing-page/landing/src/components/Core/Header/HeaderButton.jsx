import React from "react";

const HeaderButton = ({ btnWrapperClasses, btnClasses, btnText }) => {
  return (
    <div className={`header-button site-header__btns ${btnWrapperClasses}`}>
      <a className={btnClasses} href="#">
        {btnText}
      </a>
    </div>
  );
};

export default HeaderButton;
