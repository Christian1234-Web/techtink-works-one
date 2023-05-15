import React from "react";

const TestimonialCard = ({ text, image, userName, position }) => {
  return (
    <div className="card-testimonial-04">
      <div className="card-testimonial-04__content">
        <p className="heading-dark text">{text}</p>
        <div className="card-testimonial-04__content--rataing">
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
          <i className="fas fa-star" />
        </div>
      </div>
      <div className="card-testimonial-04__info">
        <div className="card-testimonial-04__info--img">
          <img src={image} />
        </div>
        <div className="card-testimonial-04__info--details">
          <h6 className="name">{userName}</h6>
          <span className="text-dark position">{position}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
