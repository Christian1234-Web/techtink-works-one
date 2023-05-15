import React from 'react'
import ScreenshotSliderOne from '~components/lib/Slider/ScreenshotSliderOne'
const ContentSection = () => {
return(
<div className="content-section-07">
  <div className="container">
    {/* Section Title */}
    <div className="row justify-content-center">
      <div className="col-xl-7 col-lg-8 col-md-10">
        <div className="text-center section-title content-title">
          <h2 className="title">App screenshots</h2>
          <p className="text-dark">An enim nullam tempor gravida donec enim  congue <br className="d-none d-xs-block" /> magnasus varius blandit sit amet non magna.</p>
        </div>
      </div>
    </div>
  </div>
<ScreenshotSliderOne/>
</div>

)
}
 
export default ContentSection