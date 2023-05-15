import React from 'react'
import TestimonialSlider from '~components/lib/Slider/TestimonialSliderOne/TestimonialSlider'
 
const Testimonial = () => {
return(
<div className="testimonial-section-01">
  <div className="container">
    <div className="row align-items-center justify-content-center">
      <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-xs-11 order-2 order-lg-1 text-center text-lg-start">
        <div className="section-title testimonial-title">
          <h2 className="title">What clients are saying</h2>
        </div>
        <TestimonialSlider/>
      </div>
      <div className="col-xl-5 offset-xl-1 col-lg-5 col-md-9 col-xs-10 order-1 order-lg-2">
        <div className="testimonil-imageGroup" data-aos="zoom-in" data-aos-duration={800}>
          <img src="./image/home-1/testimonil.png" alt="client-image" />
        </div>
      </div>
    </div>
  </div>
</div>

)
}
 
export default Testimonial