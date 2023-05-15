import React from "react";
import { ReactSVG } from "react-svg";

const PricingCard = ({ plan, price, active, list }) => {
  return (
    <div className={`card-pricing--01${active ? " active" : ""}`}>
      <div className="card-pricing--01__head">
        <h3 className="card-pricing--01__plan-title">{plan}</h3>
        <h2 className="card-pricing--01__price">{price}</h2>
        <span className="card-pricing--01__plan-text">Per Month</span>
      </div>
      <div className="d-flex justify-content-center">
        {list && (
          <ul className="card-pricing--01__list list-unstyled">
            {list.map(({ text, id }) => {
              return (
                <li key={id}>
                  <ReactSVG
                    src="./image/icons/icon-check.svg"
                    alt="check"
                    className="fill-primary icon-check"
                  />
                  {text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="card-pricing--01__button text-center">
        <a
          href="#"
          className={`btn btn-white-gradient${active ? " active" : ""}`}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
