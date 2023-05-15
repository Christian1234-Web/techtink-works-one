import React from "react";
import { ReactSVG } from "react-svg";

const ServiceSection = () => {
  return (
    <div className="service-section-03">
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-8 mb-mobile-lg">
            <div className="service-section-03__sidebar">
              <h6 className="title">Departments</h6>
              <ul className="p-0 m-0 service-section-03__sidebar--list">
                <li className="active">
                  <a href="/#">All Departments (128)</a>
                </li>
                <li>
                  <a href="/#">Finance Department (08)</a>
                </li>
                <li>
                  <a href="/#">Markting Department (20)</a>
                </li>
                <li>
                  <a href="/#">Management Department (38)</a>
                </li>
                <li>
                  <a href="/#">Human resource Department (10)</a>
                </li>
                <li>
                  <a href="/#">Design Analysis (30)</a>
                </li>
                <li>
                  <a href="/#">International Communication (03)</a>
                </li>
                <li>
                  <a href="/#">Sale Department (52)</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7">
            <div className="service-section-03__wrapper">
              <div className="block-title service-section-03__wrapper--content">
                <h2 className="titel">Available jobs</h2>
                <p className="text-dark m-0">
                  Employees fear outside consultants coming in and{" "}
                  <br className="d-none d-md-block" /> destroying the workflow.
                  Our clients face no such issues.
                </p>
              </div>
              <ul className="service-section-03__wrapper--job-list">
                <li>
                  <a href="/#">
                    <div className="list-content">
                      <div className="list-content--texts">
                        <h6>Financial Department Manager</h6>
                        <span>Full Time, USA</span>
                      </div>
                      <div className="list-content--icon">
                        <ReactSVG
                          src="./image/career/arrow.svg"
                          className="make-it-inline"
                          alt="arrow-icon"
                        />
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <div className="list-content">
                      <div className="list-content--texts">
                        <h6>Sales Department Manager</h6>
                        <span>Full Time, UK</span>
                      </div>
                      <div className="list-content--icon">
                        <ReactSVG
                          src="./image/career/arrow.svg"
                          className="make-it-inline"
                          alt="arrow-icon"
                        />
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <div className="list-content">
                      <div className="list-content--texts">
                        <h6>Assistant Customer-Care Officer</h6>
                        <span>Remote, China</span>
                      </div>
                      <div className="list-content--icon">
                        <ReactSVG
                          src="./image/career/arrow.svg"
                          className="make-it-inline"
                          alt="arrow-icon"
                        />
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <div className="list-content">
                      <div className="list-content--texts">
                        <h6>Tax Consultant</h6>
                        <span>Full Time, Germany</span>
                      </div>
                      <div className="list-content--icon">
                        <ReactSVG
                          src="./image/career/arrow.svg"
                          className="make-it-inline"
                          alt="arrow-icon"
                        />
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/#">
                    <div className="list-content">
                      <div className="list-content--texts">
                        <h6>Senior Payroll Accountany</h6>
                        <span>Remote, UK</span>
                      </div>
                      <div className="list-content--icon">
                        <ReactSVG
                          src="./image/career/arrow.svg"
                          className="make-it-inline"
                          alt="arrow-icon"
                        />
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
