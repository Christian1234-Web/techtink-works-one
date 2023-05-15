import React from "react";
import { ReactSVG } from "react-svg";
const PricingCard = ({ plan, price, active, list, color, currency }) => {
  return (
    <div className={`card card-pricing--05${active ? " active" : ""}`}>
      <div className="card-pricing--05__head">
        <h3
          className={`card-pricing--05__plan-title text-${color ? color : ""}`}
        >
          {plan}
        </h3>
        <h2 className="card-pricing--05__price">
          <span>$</span>
          {price}
        </h2>
        <span className="card-pricing--05__plan-text text-dark">Per Month</span>
      </div>
      {list && (
        <ul className="card-pricing--05__list list-unstyled">
          {list.map(({ text, id }) => {
            return (
              <li key={id}>
                <div className="icon-check icon-d-block">
                  <ReactSVG src="./image/home-10/icon-check.svg" alt="check" />
                </div>
                <span> {text}</span>
              </li>
            );
          })}
        </ul>
      )}
      <div className="card-pricing--05__button text-start">
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
