import React from 'react'
 
const TestimonialSingleSlide = ({text,name,position}) => {
return(
<div className="slide">
  <div className="testimonil-content">
    <img src="./image/home-1/quotes.svg" alt="icon" />
    <p className="text-dark text">{text}</p>
    <div className="client-info">
      <h6>-{name} </h6>
      <span>{position}</span>
    </div>
  </div>
</div>

)
}
 
export default TestimonialSingleSlide