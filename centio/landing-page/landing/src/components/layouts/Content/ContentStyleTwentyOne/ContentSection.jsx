import React from "react";
import { Nav, Tab } from "react-bootstrap";
import { ReactSVG } from "react-svg";

const ContentSection = () => {
  return (
    <div className="content-section-21">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-9 col-xs-11 col-sm-11">
            <div
              className="content-section-21__image-group mb-mobile-lg"
              data-aos="fade-right"
              data-aos-delay={500}
              data-aos-duration={1000}
            >
              <img
                src="./image/home-9/content-3.png"
                alt="content-image"
                className="mw-100"
              />
              <div
                className="content-section-21__image-group--card"
                data-aos="fade-up"
                data-aos-delay={1000}
                data-aos-duration={1000}
              >
                <img
                  src="./image/home-9/content-3-card.png"
                  alt="content-card"
                  className="w-100"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 offset-xl-1 col-lg-6 col-md-9 col-xs-11 col-sm-11">
            <div className="content-section-21__content block-title">
              <h2 className="title">
                Custer is the best online software firm in the world
              </h2>
            </div>
            <Tab.Container defaultActiveKey="home">
              <div className="content-section-21__tab">
                <Nav className="nav nav-tabs" id="myTab" role="tablist">
                  <Nav.Item>
                    <Nav.Link eventKey="home">Market Research</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="profile">
                      Strategy &amp; Direction
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="home">
                    <div className="tab-pane__content">
                      <p className="text-dark text">
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta justo integer at odio velna vitae auctor integer
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta justo integer at odio velna vitae auctor integer
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta.
                      </p>
                      <a className="btn btn-primary btn-primary-hvr" href="#">
                        Download Now
                      </a>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="profile">
                    <div className="tab-pane__content">
                      <p className="text-dark text">
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta justo integer at odio velna vitae auctor integer
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta justo integer at odio velna vitae auctor integer
                        An enim nullam tempor sapien gravida donec enim ipsum
                        porta.
                      </p>
                      <a className="btn btn-primary btn-primary-hvr" href="#">
                        Download Now
                      </a>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
