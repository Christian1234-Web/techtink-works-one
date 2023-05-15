import React, { useState } from "react";
import PricingCard from "~components/lib/Card/PrcingCardStyleFour";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import PrcingData from "./data";

const PricingSection = () => {
  const [yearly,setYearly] = useState(true);
  return (
    <div className="pricing-section-07">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title pricing-section-07__title">
              <h2 className="title">
                We offer simple pricing <br className="d-none d-xs-block" />{" "}
                plan for you
              </h2>
              <div className="pricing-section-07__button">
                <label className="mb-3 mb-lg-0 pricing-section-07__button--text text-dark">
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
                <label className="mb-3 mb-lg-0 pricing-section-07__button--text text-dark">
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        
          <ThreeColSlider className="row-xl three-row-mobile-slider pricing-section-05__price-card align-items-center pricing-center-card-scale">
          {PrcingData.map(({ plan, list, active, price, id, color }, index) => {
            return (
              <div
                className="col-lg-4 col-md-8 col-sm-8 col-xs-10 col-11"
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
                  color={color}
                  currency="$"
                />
              </div>
            );
          })}
        </ThreeColSlider>
      </div>
    </div>
  );
};

export default PricingSection;
