import React, { useRef, useState } from "react";
import PricingCard from "~components/lib/Card/PrcingCardStyleTwo";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import { threeColSliderConfig } from "~data/sliderConfig";
import PrcingData from "./data";

const PricingSection = ({ subColor }) => {
  return (
    <div className="pricing-section-02">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-11 text-center">
            <div className="section-title pricing-section-02__title">
              <h6 className={`subtitle ${subColor}`}>Pricing &amp; Plans</h6>
              <h2 className="title">
                We have exclusive plan <br className="d-none d-xl-block" /> in
                our pricing
              </h2>
              <p className="text-dark">
                Vero homero perfecto mei ut, sonet aperiam an
                <br className="d-none d-xl-block" /> nec.mpus elit a laoreet
                volut pat.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-9 col-xs-11">
            <ThreeColSlider className="three-row-mobile-slider">
              {PrcingData.map(
                ({ plan, list, active, priceIcon, price, id }, index) => {
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
                        price={price}
                        active={active}
                        priceIcon={priceIcon}
                      />
                    </div>
                  );
                }
              )}
            </ThreeColSlider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
