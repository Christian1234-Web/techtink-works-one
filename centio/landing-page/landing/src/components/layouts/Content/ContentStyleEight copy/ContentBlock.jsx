import React from 'react'
 
export default function ContentBlock(){
return(
<div className="row align-items-center justify-content-center">
    <div className="col-xl-7 col-lg-6 col-md-8 col-sm-10 col-xs-11">
      <div className="content-section-08__image-group">
        <img
          className="w-100"
          src="./image/home-4/content-2-img-1.png"
          alt="content image"
        />
        <div className="content-section-08__image-group--card">
          <img
            src="./image/home-4/content-2-card.png"
            alt="content image"
          />
        </div>
        <div className="content-section-08__image-group--shape">
          <img
            src="./image/home-4/content-shape-4.svg"
            alt="content image"
            className="make-it-inline"
          />
        </div>
      </div>
    </div>
    <div
      className="col-xl-5 col-lg-5 col-md-8 col-11"
      data-aos="fade-left"
      data-aos-delay={500}
      data-aos-duration={1000}
    >
      <div className="content-section-08__content text-center text-lg-start block-title">
        <h2 className="title heading-light">
          We performed with maximum security
        </h2>
        <p className="text-light">
          Vero homero perfecto mei ut, sonet aperiam an nec. Ni
          <br className="d-none d-xxl-block" /> nec dict altera legimu.
          Me vita haeo tibi que com titure
          <br className="d-none d-xxl-block" /> viset cut.Proin tempus
          elit a laoreet volut pat.
        </p>
        <a className="btn btn-primary btn-primary-hvr" href="#">
          Download Now
        </a>
      </div>
    </div>
  </div>
)
}