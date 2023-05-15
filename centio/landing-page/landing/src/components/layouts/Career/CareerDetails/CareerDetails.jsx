import React from "react";

const CareerDetails = () => {
  return (
    <div className="content-section-25">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-4 col-md-10 mb-mobile-lg">
            <div className="content-section-25__sidebar">
              <h6 className="title">Application Process</h6>
              <ul className="content-section-25__sidebar--lis">
                <li>
                  1. Download Application
                  <div className="download-btn-group">
                    <a href="#">
                      <div className="icon">
                        <img
                          src="./image/career/pdf.svg"
                          className="make-it-inline"
                          alt="pdf-icon"
                        />
                      </div>
                      <p>Download.Pdf</p>
                    </a>
                    <a href="#">
                      <div className="icon">
                        <img
                          src="./image/career/doc.svg"
                          className="make-it-inline"
                          alt="doc-icon"
                        />
                      </div>
                      <p>Download.Doc</p>
                    </a>
                  </div>
                </li>
                <li>2. Fill Information</li>
                <li>3. Send Back To Us</li>
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-10">
            <div className="content-section-25__content">
              <div className="block-title content-section-25__content--texts">
                <h2 className="title">Financial Department Manager</h2>
                <p className="text-dark m-0">
                  We are looking for a reliable Financial Manager that will
                  analyze every day financial activities and subsequently
                  provide advice and guidance to upper management on future
                  financial plans. <br />
                  <br />
                  The goal is to enable the company’s leaders to make sound
                  business decisions and meet the{" "}
                  <br className="d-none d-xl-block" /> company’s objectives.
                </p>
              </div>
              <div className="content-section-25__content--list">
                <h3 className="title">Responsibilities</h3>
                <ul className="m-0 p-0">
                  <li>
                    Assist with response to inquiries, providing data quickly
                    and accurately, using mostly sql, but also excel and other
                    tools such as Tableau
                  </li>
                  <li>
                    Provide financial reports and interpret financial
                    information to managerial staff while recommending further
                    courses of action.
                  </li>
                  <li>
                    Analyze costs, pricing, variable contributions, sales
                    results and the company’s actual performance compared to the
                    business plans.
                  </li>
                  <li>
                    Deep data analysis both on the supply and demand side to
                    provide a clear understanding on the marketplace performance
                    at different levels.
                  </li>
                  <li>
                    Oversee operations of the finance department, set goals and
                    objectives, and design a framework for these to be met.
                  </li>
                  <li>
                    Assist with the production of reports, and gather external
                    data to have a better understanding on our performance vs
                    the industry.
                  </li>
                </ul>
              </div>
              <div className="content-section-25__content--list">
                <h3 className="title">Requirements</h3>
                <ul className="m-0 p-0">
                  <li>Proven experience as a Financial Manager.</li>
                  <li>
                    Bachelor of Science degree in Business Informatics,
                    Information Systems, Business Administration or related
                    field.
                  </li>
                  <li>
                    Expertise in SQL and experience with large databases and raw
                    data, including the ability to write queries against large
                    warehouses.
                  </li>
                  <li>
                    Extensive understanding of financial trends both within the
                    company and general market .
                  </li>
                  <li>
                    Ability to work proactively and result driven: always trying
                    to learn that extra detail that can help you take the most
                    accurate decision.
                  </li>
                  <li>
                    Strong spoken and written English is required. Spanish and
                    Italian knowledge would be a plus.
                  </li>
                </ul>
              </div>
              <a className="btn btn-primary btn-primary-hvr" href="#">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
