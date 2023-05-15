import React from 'react'
import { SuperTag } from '~components/Core'
import RatingWidget from '~components/Core/RatingWidget'
 
const FeatureCard = ({price,rating,oldPrice,title,badgeText,image,badgeColor}) => {
return(
<div className="card-feature-01">
        <div className="card-feature-01--img">
            <img src={image} alt="testimonil-img" className="w-100"/>
            <h6 className={`subject ${badgeColor}`}>
                {badgeText}
            </h6>
        </div>
        <div className="card-feature-01__body">
            <h6 className="card-feature-01__body--title">
                <SuperTag value={title}/>
            </h6>
            <RatingWidget className="card-feature-01__body--ratting list-unstyled d-flex" star={rating}/>
            <div className="card-feature-01__body--button-group">
                <h6 className="card-feature-01__body--button-group-price">${price}
                    <del>${oldPrice}</del>
                </h6>
                <a href="#" className="btn btn-primary btn-primary -hvr">Enroll Now</a>
            </div>
        </div>
    </div>
)
}
 
export default FeatureCard