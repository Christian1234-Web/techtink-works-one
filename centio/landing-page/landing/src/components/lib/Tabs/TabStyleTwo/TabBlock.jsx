import React from "react";
import { Tab } from "react-bootstrap";
import TabNav from "./TabNav";

const TabBlock = ({ tabItems = [] }) => {
  return (
    <Tab.Container defaultActiveKey="first">
      <div className="content-section-16__tab">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-10">
            <TabNav navItems={tabItems} />
          </div>
        </div>
        <Tab.Content
          className="tab-content--content-2"
          data-aos="fade-up"
          data-aos-duration={500}
          data-aos-delay={300}
        >
          {tabItems.map((item, index) => {
            return (
              <Tab.Pane eventKey={item.id} key={item.id + "tc"}>
                {item.tabContent}
              </Tab.Pane>
            );
          })}
        </Tab.Content>
      </div>
    </Tab.Container>
  );
};

export default TabBlock;
