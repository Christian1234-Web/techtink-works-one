import React from "react";

const TeamCard = ({
  text,
  image,
  rating,
  category,
  speciality,
  available,
  userName
}) => {
  return (
    <div className="card-team-02">
      <div className="card-team-02--img">
        <img src={image} alt="team-img" />
      </div>
      <div className="card-team-02__body">
        <a href="" className="card-team-02__body--category text-bule">
          {category}
        </a>
        <h3 className="card-team-02__body--name">{userName}</h3>
        <span className="heading-dark card-team-02__body--specialist">
          {speciality}
        </span>
        <p className="heading-dark card-team-02__body--info">{text}</p>
        <div className="card-team-02__body--button-group">
          <span className={`text ${available ? "text-tertiary" : "text-gray"}`}>
            {available ? "Available Today" : "Not Available"}
          </span>
          <a className="btn-2 btn-primary btn-primary-hvr" href="#">
            Book Today
          </a>
        </div>
      </div>
      <div className="card-team-02--tag">
        <div className="ratting">
          <i className="fas fa-star"></i>
          <span>{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
