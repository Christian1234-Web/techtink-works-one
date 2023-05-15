import React from 'react'
import RatingWidget from '~components/Core/RatingWidget'
 
const TestimonialCard = ({image,name,position,text,rating})=> {
return(
<a href="/#" className="card-testimonial-01">
  <div className="card-testimonial-01__img">
    <img src={image} alt="testimonial" />
  </div>
  <div className="card-testimonial-01__content">
    <div className="client-info">
      <div className="client-info--detail">
        <h6>{name}</h6>
        <small className="text-dark">{position}</small>
      </div>
      <div className="client-info--rating">
        <RatingWidget star={rating}/>
      </div>
    </div>
    <p className="text-dark">{text}</p>
  </div>
</a>

)
}

export default TestimonialCard