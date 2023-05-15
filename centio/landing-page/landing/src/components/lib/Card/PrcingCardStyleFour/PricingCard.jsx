import React from "react";
const PricingCard = ({ plan, price, active, list, color, currency }) => {
  return (
    <div className={`card card-pricing--04${active ? " active" : ""}`}>
      <div className="card-pricing--04__head">
        <h3
          className={`card-pricing--04__plan-title text-${color ? color : ""}`}
        >
          {plan}
        </h3>
        <h2 className="card-pricing--04__price">
          {currency}
          {price}
        </h2>
        <span className="card-pricing--04__plan-text text-dark">Per Month</span>
      </div>
      {list && (
        <ul className="card-pricing--04__list list-unstyled">
          {list.map(({ text, id }) => {
            return <li key={id}>{text}</li>;
          })}
        </ul>
      )}
      <div className="card-pricing--04__button">
        <a
          href="#"
          className={`btn btn-primary-outline${
            active ? "-reverse" : ""
          } border-2`}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
