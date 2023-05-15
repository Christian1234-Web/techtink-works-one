import React from "react";
import { Nav } from "react-bootstrap";

const TabNav = ({ navItems=[] }) => {
  return (
    <div className="content-section-08__tab" data-aos-duration={500}>
      <Nav
        variant="pills"
        className="nav-tab--content-2 nav-tab--content-2--02 "
      >
        {navItems.map((item,index) => {
          return (
            <Nav.Item key={index}>
              <Nav.Link eventKey={item.id}>{item.navItem}</Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default TabNav;
