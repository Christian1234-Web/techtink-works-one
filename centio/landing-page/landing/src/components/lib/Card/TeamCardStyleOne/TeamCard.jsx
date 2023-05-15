import React from 'react'
 
const TeamCard = ({text,image,title}) => {
return(
<a href="/#" className="card card-team-01">
  <div className="card-image">
    <img src={image} alt="card" />
  </div>
  <div className="card-texts">
    <h3 className="card-title heading-dark">{title}</h3>
    <p className="text-dark">{text}</p>
  </div>
</a>

)
}
 
export default TeamCard