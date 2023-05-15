import React from 'react'
import { Link } from '~components/Core'
 
const Account = ({children,title,image="./image/account/signin-2.png",column="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-xs-10",className="signin-section-02"}) => {
return(
<div className={className}>
    <div className="signin-section-02__bg">
      <img src={image} alt="background-image" />
    </div>
    <div className="container">
      <div className="row justify-content-center justify-content-lg-end">
        <div className={column}>
          <div className="signin-form-02 block-title">
            <h3 className="title signin-form-02__title">{title}</h3>
            {children}
          </div>
        </div>
      </div>
    </div>
</div>
)
}
 
export default Account