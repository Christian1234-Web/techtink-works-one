import React from "react";
import { ReactSVG } from "react-svg";

const PricingCard = ({ plan, price,active, list,currency,color }) => {
  return (
    <div className={`card card-pricing--03${active ? " active" : ""}`}>
      <div className="card-pricing--03__head">
        <h3 className={`card-pricing--03__plan-title text-${color}`}>{plan}</h3>
        <h2 className={`card-pricing--03_price`}>{currency}{price}</h2>
        <span className="card-pricing--03__plan-text text-dark">Per Month</span>
      </div>

      <div className="d-flex">
        {list && (
          <ul className="card-pricing--03__list list-unstyled">
            {list.map(({ text, id }) => {
              return (
                <li key={id} className="d-flex">
                  <ReactSVG
                    src="./image/home-6/icon-check.svg"
                    alt="check"
                    className="icon-check"
                  />
                  {text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-pricing--03__button text-start">
        <a
          href="#"
          className={`btn btn-primary-outline${active ? "-reverse" : ""} border-2`}
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
