import React from "react";
import { SuperTag } from "~components/Core";

const Widget = ({ icon, title, text, mode="dark", className }) => {
  return (
    <div className={`widget widget-card widget-card-center ${className}`}>
      <div className="widget-icon">
        <img src={icon} alt="widget"/>
      </div>
      <div className="widget-text">
        <h3 className={`widget-title heading-${mode}`}>
          <SuperTag value={title}/>
        </h3>
        <p className={`text-${mode}`}>
          <SuperTag value={text}/>
        </p>
      </div>
    </div>
  );
};

export default Widget;
