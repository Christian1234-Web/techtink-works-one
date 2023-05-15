import React, { useRef, useState } from "react";
import PricingCard from "~components/lib/Card/PrcingCardStyleOne";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
// import { threeColSliderConfig } from "~data/sliderConfig";
import PrcingData from "./data";

const PricingSection = () => {
    const [yearly,setYearly] = useState(true);
  return (
    <div className="pricing-section-01">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title pricing-section-01__title">
              <h6 className="subtitle text-primary">Pricing &amp; Plans </h6>
              <h2 className="title">
                We have exclusive <br className="d-none d-xs-block" /> plans for
                you to choose
              </h2>
              <div className="pricing-section-01__button">
                <label className="mb-3 mb-lg-0 pricing-section-01__button--text text-dark">
                  Monthly
                </label>
                <div className="btn-toggle__wrapper mb-3 mb-lg-0">
                  <input
                    className="btn-toggle price-deck-trigger"
                    type="checkbox"
                    checked={yearly}
                    id="btn-toggle"
                    onChange={() => setYearly(!yearly)}
                  />
                  <label htmlFor="btn-toggle" />
                </div>
                <label className="mb-3 mb-lg-0 pricing-section-01__button--text text-dark">
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-9 col-xs-11">
          <ThreeColSlider
            className="three-row-mobile-slider"
            >
            {PrcingData.map(({ plan, list, active, price ,id},index) => {
                return (
                  <div
                    className="col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay={200 * index}
                    data-aos-duration="1000"
                    key={id}
                  >
                    <PricingCard
                      plan={plan}
                      list={list}
                      price={yearly ? price.yearly : price.monthly}
                      active={active}
                    />
                  </div>
                );
              })}
            </ThreeColSlider>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PricingSection;
