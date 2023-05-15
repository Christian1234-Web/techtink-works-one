import React from "react";
import PricingCardStyleThree from "~components/lib/Card/PricingCardStyleThree";
import ThreeColSlider from "~components/lib/Slider/MobileSlider/ThreeColSlider";
// import { threeColSliderConfig } from "~data/sliderConfig";
import PrcingData from "./data";

const PricingSection = () => {
  return (
    <div className="pricing-section-03">
  <div className="pricing-section-03__shape" data-aos="fade-left" data-aos-delay={500} data-aos-duration={1000}>
    <img src="./image/home-6/content-shape.svg" alt="shape" />
  </div>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6 text-center">
        <div className="section-title pricing-section-03__title">
          <h6 className="subtitle text-secondary  mb-20">Pricing &amp; Plans </h6>
          <h2 className="title">We have exclusive plan <br className="d-none d-xs-block" /> in our pricing</h2>
          <p className="text-dark">An enim nullam tempor sapien gravida donec enim <br className="d-none d-xs-block" />
            ipsum porta justo integena gna at pretium </p>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-12 col-md-9 col-xs-11">
        <ThreeColSlider className="row-xl">
            {PrcingData.map(({plan,price,active,list,color},index)=>{
                return(
                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200 * index} data-aos-duration={1000} key={index + "psc4"}>
                      <PricingCardStyleThree plan={plan} price={price} active={active} list={list} currency={"$"} color={color}/>
                    </div>
                )
            })}
        </ThreeColSlider>
      </div>
    </div>
  </div>
</div>

  );
};

export default PricingSection;






