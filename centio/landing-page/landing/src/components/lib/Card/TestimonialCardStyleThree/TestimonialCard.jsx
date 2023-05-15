import React from 'react'
 
const TestimonialCard = ({image,name,position,text})=> {
return(
<div className="card card-testimonil-03">
  <div className="card-info">
    <div className="card-info--img">
      <img src={image} alt="client-image" />
    </div>
    <div className="card-body">
      <h6 className="card-body--name">{name}</h6>
      <small className="text-dark card-body--profession">{position}</small>
    </div>
  </div>
  <p className="heading-dark card-text">{text}</p>
</div>

)
}

export default TestimonialCard