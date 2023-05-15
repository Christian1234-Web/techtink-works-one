import React from "react";
import { PageWrapper } from "~components/Core";
import PortfolioSection from "~components/layouts/Portfolio/PortfolioLayout/PortfolioSection";

const portfolioItems = [
  {
    image: "./image/portfolio/grid-3-1.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "1",
    tags: ["all", "development"],
  },
  {
    image: "./image/portfolio/grid-3-2.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "2",
    tags: ["all"],
  },
  {
    image: "./image/portfolio/grid-3-3.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "3",
    tags: ["all"],
  },
  {
    image: "./image/portfolio/grid-3-4.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "4",
    tags: ["all", "seo"],
  },
  {
    image: "./image/portfolio/grid-3-5.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "5",
    tags: ["all", "development"],
  },
  {
    image: "./image/portfolio/grid-3-6.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "6",
    tags: ["all", "work"],
  },
  {
    image: "./image/portfolio/grid-3-7.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "7",
    tags: ["all", "marketing"],
  },
  {
    image: "./image/portfolio/grid-3-8.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "8",
    tags: ["all", "work"],
  },
  {
    image: "./image/portfolio/grid-3-9.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "8",
    tags: ["all", "work"],
  },
];

export default function PortfolioThree() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Portfolio grid–3 Columns",
          activePage: "Portfolio",
        },
      }}
    >
      <PortfolioSection
        gridCol="col-md-4 col-xs-6 no-border"
        portfolioData={portfolioItems}
        noGutter={true}
      />
    </PageWrapper>
  );
}
