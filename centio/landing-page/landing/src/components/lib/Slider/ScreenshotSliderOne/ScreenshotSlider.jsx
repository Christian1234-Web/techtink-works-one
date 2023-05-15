import React from 'react'
import SlickSlider from '~components/lib/Slider/SlickSlider'
import {screenshotSlider} from '~data/sliderConfig'
const dataDefault = [
  {
    id:"ss0101",
    src:"./image/home-3/screenshot/1.png",
  },
  {
    id:"ss0102",
    src:"./image/home-3/screenshot/2.png",
  },
  {
    id:"ss0103",
    src:"./image/home-3/screenshot/3.png",
  },
  {
    id:"ss0104",
    src:"./image/home-3/screenshot/4.png",
  },
  {
    id:"ss0105",
    src:"./image/home-3/screenshot/5.png",
  },
  {
    id:"ss0105",
    src:"./image/home-3/screenshot/4.png",
  }
]
const ScreenshotSlider = ({data=dataDefault,sliderConfig=screenshotSlider}) => {
return(
<div className="screenshot-slider-wrapper">
    <SlickSlider className="screenshot-slider slider-dots-style-one" sliderConfig={sliderConfig}>
      {data.map((item,index)=>{
        return(
          <div className="single-slide focus-reset" key={item.id}>
              <div className="screenshot-image">
                <img src={item.src} alt="ss" />
              </div>
          </div>
        )
      })}
    </SlickSlider>
    {/* / .Screenshot Area */}
    <div className="phone-bg-img">
      <img src="./image/home-3/screenshot/frame.png" alt="ss" />
    </div>
  </div>
)
}
 
export default ScreenshotSlider