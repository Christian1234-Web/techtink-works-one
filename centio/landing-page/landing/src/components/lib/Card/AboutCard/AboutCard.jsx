import React from "react";
import { ReactSVG } from "react-svg";

const AboutCard = ({image,title,text}) => {
  return (
    <div className="card-about">
      <div className="card-about--img">
        <ReactSVG src={image} alt="shape" />
      </div>
      <div className="card-about__body">
        <h5 className="card-about__body--title">{title}</h5>
        <p className="text-dark card-about__body--text">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;
