import React from "react";
import ScreenshotSliderOne from "~components/lib/Slider/ScreenshotSliderOne";
const slideData = [
  {
    id: "ss0101",
    src: "./image/home-5/screenshot/1.png",
  },
  {
    id: "ss0102",
    src: "./image/home-5/screenshot/2.png",
  },
  {
    id: "ss0103",
    src: "./image/home-5/screenshot/3.png",
  },
  {
    id: "ss0104",
    src: "./image/home-5/screenshot/4.png",
  },
  {
    id: "ss0105",
    src: "./image/home-5/screenshot/5.png",
  },
  {
    id: "ss0105",
    src: "./image/home-5/screenshot/4.png",
  },
];
const ContentSection = () => {
  return (
    <div className="content-section-10">
      <div className="container">
        {/* Section Title */}
        <div className="text-center section-title content-section-10__content content-title">
          <h6 className="subtitle text-secondary mb-20">See Inside App</h6>
          <h2 className="title">
            Start your learning <br className="d-xs-block d-none" /> journey
            with Custer!
          </h2>
          <p className="text-dark">
            An enim nullam tempor sapien gravida donec enim ipsum{" "}
            <br className="d-xs-block d-none" />
            porta justo integer at odio velna vitae auctor integer.
          </p>
        </div>
        {/* End Section Title */}
      </div>
      <ScreenshotSliderOne data={slideData} />
    </div>
  );
};

export default ContentSection;
