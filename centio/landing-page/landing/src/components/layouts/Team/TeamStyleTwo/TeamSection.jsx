import React, { useRef } from "react";
import TeamCardStyleTwo from "~components/lib/Card/TeamCardStyleTwo";
import FourColSlider from "~components/lib/Slider/MobileSlider/FourColSlider";
import data from "./data";
const TeamSection = () => {
  return (
    <div className="team-section-02">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xs-7">
            <div className="block-title team-section-02__content">
              <h6 className="subtitle text-secondary  mb-20">
                Meet our professionals
              </h6>
              <h2 className="title">
                Meet the top & <br className="d-none d-xs-block" /> best rated
                doctors
              </h2>
            </div>
          </div>
          <div className="col-md-6 col-xs-5 ">
            <div className="team-section-02__button">
              <a href="#">View all doctors</a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-9 col-xs-11">
            <FourColSlider className="four-row-mobile-slider team-section-02__card  mobile-slider row">
              {data.map(
                (
                  {
                    image,
                    available,
                    category,
                    userName,
                    text,
                    speciality,
                    id,
                    rating,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="col-lg-3"
                      data-aos="fade-up"
                      data-aos-delay={200 * index}
                      data-aos-duration={1000}
                      key={id + index}
                    >
                      <TeamCardStyleTwo
                        image={image}
                        text={text}
                        available={available}
                        category={category}
                        userName={userName}
                        speciality={speciality}
                        rating={rating}
                      />
                    </div>
                  );
                }
              )}
            </FourColSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
