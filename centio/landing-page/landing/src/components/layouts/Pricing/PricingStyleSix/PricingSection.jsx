import React, { useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import PricingCard from "~components/lib/Card/PrcingCardStyleFive";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import PrcingData from "./data";

const PricingSection = () => {
  return (
    <div className="pricing-section-06">
      <div
        className="pricing-section-06__shape"
        data-aos="fade-right"
        data-aos-delay={1300}
        data-aos-duration={1000}
      >
        <img src="./image/home-10/dots.svg" className="w-100" alt="shape" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title pricing-section-06__title">
              <h6 className="subtitle text-secondary mb-20">
                Pricing &amp; Plans{" "}
              </h6>
              <h2 className="title">
                We have exclusive plan <br className="d-none d-xs-block" /> in
                our pricing
              </h2>
            </div>
          </div>
        </div>
        <ThreeColSlider className="row pricing-sider three-row-mobile-slider mobile-slider">
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
                  price={price}
                  active={active}
                  color={color}
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
