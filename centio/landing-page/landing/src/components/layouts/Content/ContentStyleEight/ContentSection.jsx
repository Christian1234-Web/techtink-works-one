import React from "react";
import { ReactSVG } from "react-svg";
import TabBlock from "~components/lib/Tabs/TabStyleOne/TabBlock";
import ContentBlock from "./ContentBlock";

const tabItemsData = [
  {
    id: "first",
    navItem: "App security",
    tabContent: <ContentBlock />,
  },
  {
    id: "second",
    navItem: "Continuous monitoring",
    tabContent: <ContentBlock />,
  },
  {
    id: "third",
    navItem: "Data storage",
    tabContent: <ContentBlock />,
  },
];

const ContentSection = () => {
  return (
    <div className="content-section-08">
      <div className="content-section-08__shape-1 circle-x">
        <img
          src="./image/home-4/content-shape-5.svg"
          alt="shape"
          className="make-it-inline"
        />
      </div>
      <div className="content-section-08__shape-2 shape-x-1">
        <ReactSVG
          src="./image/home-4/content-shape-6.svg"
          alt="shape"
          className="make-it-inline fill-secondary"
        />
      </div>
      <div className="container">
        <TabBlock tabItems={tabItemsData} />
      </div>
    </div>
  );
};

export default ContentSection;
