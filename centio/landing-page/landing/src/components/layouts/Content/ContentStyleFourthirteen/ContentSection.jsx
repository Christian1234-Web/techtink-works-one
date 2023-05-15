import React from "react";

const ContentSection = () => {
  return (
    <div className="content-section-14">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-xl-6 col-lg-6 col-md-10 col-xs-10 col-sm-11"
            data-aos="fade-right"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="content-section-14__image-group">
              <img
                src="./image/home-6/content-2.png"
                alt="content-image"
                className="w-100"
              />
              <div className="content-section-14__image-group--card">
                <img
                  src="./image/home-6/content-2-card.png"
                  alt="card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div
            className="col-xxl-5 offset-xxl-1 col-lg-6 col-md-8 col-xs-10 col-sm-11 "
            data-aos="fade-up"
            data-aos-delay={500}
            data-aos-duration={1000}
          >
            <div className="block-title content-section-14__content">
              <h6 className="subtitle text-secondary  mb-20">
                Awesome software
              </h6>
              <h2 className="title">
                Get tips and tricks on how to skyrocket your sales with Custer
              </h2>
              <p className="text-dark">
                An enim nullam tempor sapien gravida donec enim ipsum porta
                justo integer at odio velna vitae auctor integer congue magna.{" "}
              </p>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
