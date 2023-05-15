import React from 'react'
 
const TestimonialCard = ({image,name,position,text})=> {
return(
<div className="card card-testimonil-02">
  <div className="card-text">
    <p className="text-dark">{text}</p>
  </div>
  <div className="card-info">
    <div className="card-info--img">
      <img src={image} alt="client-image" />
    </div>
    <div className="card-info--details">
      <h6>{name}</h6>
      <small className="text-dark">{position}</small>
    </div>
  </div>
</div>
)
}

export default TestimonialCard