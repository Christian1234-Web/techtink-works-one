import React from "react";
import TabBlock from "~components/lib/Tabs/TabStyleTwo/TabBlock";
import ContentBlock from "./ContentBlock";

const tabItemsData = [
  {
    id: "first",
    navItem: "Software for business",
    tabContent: <ContentBlock />,
  },
  {
    id: "second",
    navItem: "Live chat software",
    tabContent: <ContentBlock />,
  },
  {
    id: "third",
    navItem: "Customer conversation",
    tabContent: <ContentBlock />,
  },
];

const ContentSection = () => {
  return (
    <div className="content-section-16">
      <div className="content-section-16__shape-1">
        <img
          src="./image/home-7/content-section-shape.png"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="content-section-16__shape-2">
        <img
          src="./image/home-7/content-2-shape-6.png"
          alt="shape"
          className="w-100"
        />
      </div>
      <div className="container">
        <TabBlock tabItems={tabItemsData} />
      </div>
    </div>
  );
};

export default ContentSection;
