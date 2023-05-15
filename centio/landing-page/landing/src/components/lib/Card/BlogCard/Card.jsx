import React from "react";
import { ReactSVG } from "react-svg";
import { Link } from "~components/Core";

const Card = ({ title, image, text, meta, date }) => {
  return (
    <div>
      <div className="blog-card-01">
        <div className="blog-card-01--img">
          <img src={image} alt="blog-img" className="w-100" />
        </div>
        <div className="blog-card-01__body">
          <div className="blog-card-01__body--meta">
            <Link to="/blog-details" className="admmin">
                <ReactSVG
                  src="./image/blog/admin.svg"
                  className="icon-d-block mb-1"
                  alt="blog-image"
                />
              <span>{meta}</span>
            </Link>
            <a href="#" className="date">
              <ReactSVG
                src="./image/blog/clender.svg"
                className="icon-d-block mb-1"
                alt="blog-image"
              />
              <span>{date}</span>
            </a>
          </div>
          <div className="blog-card-01__body--content">
            <Link to="/blog-details">
                <h6 className="title">{title}</h6>
            </Link>
            <p className="text-dark text">{text}</p>
            <Link to="/blog-details" className="more-btn">
                Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
