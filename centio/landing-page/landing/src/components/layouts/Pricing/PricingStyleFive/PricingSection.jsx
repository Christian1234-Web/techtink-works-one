import React, { useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import PricingCard from "~components/lib/Card/PrcingCardStyleFour";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
import PrcingData from "./data";

const PricingSection = () => {
  return (
    <div className="pricing-section-05">
      <div
        className="pricing-section-05__shape-1"
        data-aos="fade-right"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <ReactSVG
          src="./image/home-9/section-shape-1.svg"
          alt="shape"
          className="react-svg-w-100"
        />
      </div>
      <div
        className="pricing-section-05__shape-2"
        data-aos="fade-left"
        data-aos-delay={500}
        data-aos-duration={1000}
      >
        <ReactSVG
          src="./image/home-9/price-shape.svg"
          alt="shape"
          className="react-svg-w-100"
        />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title pricing-section-05__title">
              <h6 className="subtitle text-blue mb-20">Pricing &amp; Plans </h6>
              <h2 className="title">
                We offer simple pricing <br className="d-none d-xs-block" />{" "}
                plan for you
              </h2>
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
                  price={price}
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
