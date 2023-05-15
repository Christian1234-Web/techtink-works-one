import React from "react";
import { SuperTag } from "~components/Core";

const Widget = ({
  iconImage,
  iconText=false,
  iconClass,
  title,
  titleClass,
  textClass,
  text,
  iconWrapperClass,
  className,
}) => {
  return (
    <div className={`widget ${className}`}>
      {!iconImage && !iconText ? (
        <div
          className={`widget-icon${
            iconWrapperClass ? " " + iconWrapperClass : ""
          }`}
        >
          <i className={iconClass}></i>
        </div>
      ) : null}
      {iconImage ? (
        <div
          className={`widget-icon${
            iconWrapperClass ? " " + iconWrapperClass : ""
          }`}
        >
          <img src={iconImage} alt="icon" className="mxw-none"/>
        </div>
      ) : null}
      {iconText ? (
        <div
          className={`widget-icon${
            iconWrapperClass ? " " + iconWrapperClass : ""
          }`}
        >
          {iconText}
        </div>
      ) : null}

      <div className="widget-text">
        <h3 className={`widget-title${titleClass ? " " + titleClass : ""}`}>
          <SuperTag value={title} />
        </h3>
        <p className={`widget-text${textClass ? " " + textClass : ""}`}>
          <SuperTag value={text} />
        </p>
      </div>
    </div>
  );
};

export default Widget;
