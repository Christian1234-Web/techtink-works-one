import React from 'react'
import Video from '~components/Core/VideoModal'
 
const AboutSection = () => {
return(
<div className="about-section-01">
  <div className="scetion-shape">
    <img src="./image/home-2/section-shape.png" alt="shape" className="w-100" />
  </div>
  <div className="container">
    <div className="row align-items-center text-lg-start text-center justify-content-center">
      <div className="col-xxl-6 offset-xxl-1 col-xl-6 col-lg-6 col-md-8 col-xs-11 order-lg-2 mb-mobile-lg" data-aos="fade-left" data-aos-duration={800}>
        <div className="video-block">
          <img src="./image/home-2/about.png" alt="content-image" className="w-100" />
          <div className="video-button-block">
            <Video id="LWZ7iytIA6k" className="video-btn popup-btn video-btn-1 text-secondary bg-white">
              <i className="fas fa-play" />
            </Video>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xxl-5 col-xl-6 col-md-9 order-lg-1 col-xs-11">
        <div className="about-section-01__content block-title" data-aos="fade-up" data-aos-duration={1000}>
          <h6 className="subtitle text-primary">About our software </h6>
          <h2 className="title">Organize your tasks <br className="d-none d-sm-block" /> &amp; boost productivity.</h2>
          <p className="text-dark">There are many scenarios that could result in initiated <br className="d-none d-sm-block" /> attacks. These can be an giving away login credentials.</p>
          <a href="#" className="btn  btn-l2 btn-secondary btn-secondary-hvr">Get Started</a>
        </div>
      </div>
    </div>
  </div>
</div>

)
}
 
export default AboutSection