import React from "react";
import { Nav } from "react-bootstrap";

const TabNav = ({ navItems = [] }) => {
  return (
    <div className="content-section-16__tab" data-aos-duration={500}>
      <Nav variant="pills" className="nav nav-tabs nav-tab--content-2">
        {navItems.map((item, index) => {
          return (
            <Nav.Item key={item.id}>
              <Nav.Link eventKey={item.id}>{item.navItem}</Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default TabNav;
