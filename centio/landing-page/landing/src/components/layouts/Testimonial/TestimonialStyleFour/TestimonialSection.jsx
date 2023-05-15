import React, { useRef } from 'react'
import TestimonialSliderTwo from '~components/lib/Slider/TestimonialSliderTwo';
const Testimonial = () => {
  const elSlider = useRef();
return(
<div className="testimonil-section-04">
  <div className="container">
    <div className="row">
      <div className="section-title testimonil-section-04__title">
        <h6 className="subtitle text-secondary mb-20">Testimonials</h6>
        <h2 className="title">What our happy clients say</h2>
      </div>
    </div>
    <TestimonialSliderTwo/>
  </div>
</div>



)
}
export default Testimonial