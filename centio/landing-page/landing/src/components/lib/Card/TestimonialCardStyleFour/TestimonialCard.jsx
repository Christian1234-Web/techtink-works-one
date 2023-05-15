import React from 'react'
 
const TestimonialCard = ({text,image,name,position,quoteIcon="true"}) => {
return(
<div className="testimonil-section-10__content">
  <p className="heading-dark text">{text}</p>
  <div className="client-info">
    <div className="client-info--img">
      <img src={image} alt="icon" />
    </div>
    <div className="client-info--texts">
      <h6 className="name">{name}</h6>
      <span className="profession text-dark">{position}</span>
    </div>
  </div>
  {quoteIcon?<div className="quote">
    <img src="./image/home-5/qutes.svg" alt="icon" />
  </div>:null}
</div>

)
}
 
export default TestimonialCard