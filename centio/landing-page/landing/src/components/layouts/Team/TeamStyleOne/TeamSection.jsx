import React, { useRef } from "react";
import TeamCard from "~components/lib/Card/TeamCardStyleOne/TeamCard";
import FourColSlider from "~components/lib/Slider/MobileSlider/FourColSlider";
import data from "./data";
const TeamSection = ({ className }) => {
  return (
    <div className={`team-section-01 ${className}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-4 col-lg-6 col-md-9 col-xs-11">
            <div className="section-title section-title--team-01 text-center">
              <h2 className="title">Our qualified team</h2>
              <p className="text-dark">
                Fully layered dolor sit amet, consectetur Facere, nobis, id
                expedita dolores officiis laboriosam.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-9 col-xs-11">
            <FourColSlider className="team-slider--01  justify-content-center">
              {data.map(({ img, title, text, id }) => {
                return (
                  <div
                    className="col-lg-3"
                    data-aos="fade-up"
                    data-aos-delay={200 * Number(id)}
                    data-aos-duration={1000}
                    key={id}
                  >
                    <TeamCard image={img} title={title} text={text} />
                  </div>
                );
              })}
            </FourColSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
