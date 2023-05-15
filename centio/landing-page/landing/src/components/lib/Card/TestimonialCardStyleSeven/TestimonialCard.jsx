import React from 'react'
import RatingWidget from '~components/Core/RatingWidget'
 
const TestimonialCard = ({text,image,rating,userName,position}) => {
return(
<div className="card-testimonial-05">
  <p className="heading-dark text">{text}</p>
  <div className="card-testimonial-05__body">
    <div className="card-testimonial-05__body--info">
      <div className="client-img">
        <img src={image} alt="card-image" />
      </div>
      <div className="client-info">
        <h6 className="name">{userName}</h6>
        <span className="text-dark skill">{position}</span>
      </div>
    </div>
    <RatingWidget className="card-testimonial-05__body--ratting list-unstyled d-flex" star={rating}/>
  </div>
</div>

)
}
 
export default TestimonialCard