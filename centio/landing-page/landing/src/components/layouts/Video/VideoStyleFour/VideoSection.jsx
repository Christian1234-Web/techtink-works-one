import React from "react";

export default function VideoSection() {
  return (
    <div className="video-section-01 video-section-01--3 bg-transparent">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-6 col-md-9 col-xl-6 col-lg-6 offset-xxl-1 order-lg-2 mb-mobile-lg">
            <div
              className="video-block"
              data-aos="fade-left"
              data-aos-duration={800}
            >
              <img
                src="./image/career/video.png"
                alt="content-image"
                className="w-100"
              />
              <div className="dots">
                <img
                  src="./image/career/dots.svg"
                  className="w-100"
                  alt="dot"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-xxl-5 col-xl-6 col-md-8 order-lg-1">
            <div
              className="video-section-content block-title"
              data-aos="fade-right"
              data-aos-duration={800}
            >
              <h6 className="subtitle mb-20 text-secondary">
                Building your future
              </h6>
              <h2 className="title">We are Hiring</h2>
              <p className="text-dark pe-0 pe-lg-7">
                Vero homero perfecto mei ut, sonet aperiam an nec. Ni nec dict
                altera legimu. Me vita de lege ndos expet end ista aliu mi ando,
                haeo tibi que com titure viset cut.Proin tempus elit a laoreet
                volut pat. homero perfecto mei ut, sonet aperiam an nec. Ni nec
                dict altera legimu. Me vita de lege ndos expet end is ad. Ex mei
                omita aliu mi ando{" "}
              </p>
              <a href="#" className="btn btn-l1 btn-primary btn-primary-hvr">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
