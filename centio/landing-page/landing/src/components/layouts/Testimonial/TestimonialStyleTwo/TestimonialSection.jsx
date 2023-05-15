import React from 'react'
import TestimonialCardOne from '~components/lib/Card/TestimonialCardStyleOne'
import ThreeColSlider from '~components/lib/Slider/MobileSlider/ThreeColSlider'
 import data from "./data"
const Testimonial = () => {
return(
<div className="testimonial-section-02">
  <div className="container">
    <div className="section-title testimonial-section-02__title text-center">
      <h6 className="subtitle text-primary">Testimonial</h6>
      <h2 className="title">We have heard great <br className="d-none d-xs-block" /> user experience</h2>
    </div>
    <div className="row justify-content-center">
      <div className="col-xs-11 col-md-9 col-xs-11 col-lg-12">
        <ThreeColSlider>
          {data.map(({image,position,id,name,text,rating},index)=>{return(
            <div className="col-xl-4 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 * index} data-aos-duration="1000" key={id}>
               <TestimonialCardOne rating={rating} name={name} text={text} image={image} position={position}/>
            </div>
          )})}
        </ThreeColSlider>
      </div>
    </div>
  </div>
</div>


)
}
 
export default Testimonial