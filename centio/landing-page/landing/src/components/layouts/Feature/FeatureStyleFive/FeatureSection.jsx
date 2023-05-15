import React from "react";
import FeatureCardOne from "~components/lib/Card/FeatureCardOne";
import FourColSlider from "~components/lib/Slider/MobileSlider/FourColSlider";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import data from "./data";
const FeatureSection = () => {
  return (
    <div className="feature-section-05">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-9 col-sm-10 col-xs-11">
            <div className="section-title content-title text-center">
              <h6 className="subtitle text-secondary">Featured coures</h6>
              <h2 className="title">
                Explore Custer’s latest featured courses
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum
                <br className="d-none d-xs-block" /> porta justo integer at odio
                velna vitae auctor integer.
              </p>
            </div>
          </div>
        </div>
        <FourColSlider>
          {data.map(
            (
              { image, title, newPrice, oldPrice, badgeColor, badgeText },
              index
            ) => {
              return (
                <div
                  className="col-xl-3 col-lg-4"
                  data-aos="fade-up"
                  data-aos-delay={200 * index}
                  data-aos-duration="1000"
                  key={index}
                >
                  <FeatureCardOne
                    image={image}
                    title={title}
                    price={newPrice}
                    oldPrice={oldPrice}
                    badgeColor={badgeColor}
                    badgeText={badgeText}
                  />
                </div>
              );
            }
          )}
        </FourColSlider>
      </div>
    </div>
  );
};

export default FeatureSection;
