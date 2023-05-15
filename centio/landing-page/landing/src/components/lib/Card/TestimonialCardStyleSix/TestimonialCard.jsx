import React from "react";
import RatingWidget from "~components/Core/RatingWidget";

const TestimonialCard = ({ text, image, userName, position,rating }) => {
  return (
    <a href="/#" className="crad card-testimonial-06">
      <div className="card-testimonial-06__img">
        <img src={image} alt="testimonial" />
      </div>
      <div className="card-testimonial-06__content">
        <div className="client-info">
          <div className="client-info--deatail">
            <h6>
              {userName}
            </h6>
            <small className="text-dark">
              {position}
            </small>
          </div>
          <RatingWidget star={rating} className="client-info--rataing list-unstyled d-flex"/>
        </div>
        <p className="heading-dark">
          {text}
        </p>
      </div>
    </a>
  );
};

export default TestimonialCard;
