import React from "react";
import { Accordion } from "react-bootstrap";
import { AccordionItem } from "~components/Core/Accordion";
const ServiceSection = () => {
  return (
    <div className="services-section-03">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-4">
            <div className="services-section-03__tab">
              <h4 className="services-section-03__tab--title">
                Quick Navigation
              </h4>
              <div className="nav flex-column nav-pills">
                <button className="nav-link active">General</button>
                <button className="nav-link">Account</button>
                <button className="nav-link">Pricing &amp; Support</button>
                <button className="nav-link">Purchasing Online</button>
                <button className="nav-link">Returns Policy</button>
                <button className="nav-link">Technical Methods</button>
              </div>
            </div>
          </div>
          <div className="col-xl-8 offset-xl-1 col-lg-8 col-md-8">
            <div className="services-section-03__accordion">
              <Accordion defaultActiveKey="one">
                <AccordionItem
                  question="Where can I get analytics help?"
                  answer="On the other hand, the strengthening and development of the structure largely determines the creation of substantial financial and administrative conditions. Equally, the beginning of the daily work on the formation of the position provides a wide range of (specialists) participation in the formation of participatory systems."
                  accKey="one"
                />
                <AccordionItem
                  question="Equally the beginning of the daily work?"
                  answer="On the other hand, the strengthening and development of the structure largely determines the creation of substantial financial and administrative conditions. Equally, the beginning of the daily work on the formation of the position provides a wide range of (specialists) participation in the formation of participatory systems."
                  accKey="two"
                />
                <AccordionItem
                  question="What payment methods do you accept?"
                  answer="On the other hand, the strengthening and development of the structure largely determines the creation of substantial financial and administrative conditions. Equally, the beginning of the daily work on the formation of the position provides a wide range of (specialists) participation in the formation of participatory systems."
                  accKey="three"
                />
                <AccordionItem
                  question="Can I use all the Home page demos in a single website?"
                  answer="On the other hand, the strengthening and development of the structure largely determines the creation of substantial financial and administrative conditions. Equally, the beginning of the daily work on the formation of the position provides a wide range of (specialists) participation in the formation of participatory systems."
                  accKey="four"
                />
                <AccordionItem
                  question="What kind of data is needed for analysis?"
                  answer="On the other hand, the strengthening and development of the structure largely determines the creation of substantial financial and administrative conditions. Equally, the beginning of the daily work on the formation of the position provides a wide range of (specialists) participation in the formation of participatory systems."
                  accKey="five"
                />
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceSection;
