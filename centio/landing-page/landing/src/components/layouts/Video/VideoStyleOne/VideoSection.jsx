import React from "react";
import Video from "~components/Core/VideoModal";

export default function VideoSection() {
  return (
    <div className="video-section-01">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-xxl-6 col-md-8 col-xl-6 offset-xxl-1 col-11 order-lg-2 mb-mobile-lg">
            <div
              className="video-block"
              data-aos="fade-left"
              data-aos-duration={800}
            >
              <img
                src="./image/home-1/video-image.png"
                alt="content-image"
                className="w-100"
              />
              <div className="video-button-block">
                <Video
                  id="LWZ7iytIA6k"
                  className="video-btn popup-btn video-btn-1 text-primary  sonar-emitter bg-white"
                >
                  <i className="fas fa-play" />
                </Video>
                <p className="heading-light video-block--text">
                  Watch a Quick Tutorial
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-5 col-xl-6 col-md-9 col-xs-11 order-lg-1">
            <div
              className="video-section-content block-title text-center text-lg-start"
              data-aos="fade-right"
              data-aos-duration={800}
            >
              <h2 className="title">
                Starting with Custer <br className="d-none d-xl-block" /> is
                easier than anything!
              </h2>
              <p className="text-dark">
                Vero homero perfecto mei ut, sonet aperiam an nec. Ni nec dict
                altera legimu. Me vita de lege ndos expet end is ad. Ex mei
                omita aliu mi ando, haeo tibi que com titure viset cut.Proin
                tempus elit a laoreet volut pat.{" "}
              </p>
              <a href="#" className="btn btn-l1 btn-primary btn-primary-hvr">
                Download Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
