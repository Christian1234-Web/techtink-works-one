import React from 'react'
const Loader = ({show}) => {
  if(!show){
    return null
  }
return(
<div className={`preloader-wrapper`} id="loader">
  <div className={`loading`}>
    <div className="bounceball" />
    <div className="text">NOW LOADING</div>
  </div>
</div>

)
}
 
export default Loader