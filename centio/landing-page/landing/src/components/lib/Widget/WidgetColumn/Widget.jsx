import React from "react";
import { SuperTag } from "~components/Core";

const WidgetColumn = ({
  text,
  title,
  fontIcon,
  iconImage,
  iconClass,
  titleClass,
  textClass,
  className,
  iconWrapperClass,
}) => {
  return (
    <div className={`widget widget-column ${className}`}>
      {fontIcon ? (
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
          <img src={iconImage} alt="icon" />
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

export default WidgetColumn;
