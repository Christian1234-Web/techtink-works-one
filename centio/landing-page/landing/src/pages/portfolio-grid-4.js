import React from "react";
import { PageWrapper } from "~components/Core";
import PortfolioSection from "~components/layouts/Portfolio/PortfolioLayout/PortfolioSection";

const portfolioItems = [
  {
    image: "./image/portfolio/grid-2-1.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "1",
    tags: ["all", "development"],
  },
  {
    image: "./image/portfolio/grid-2-2.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "2",
    tags: ["all"],
  },
  {
    image: "./image/portfolio/grid-2-3.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "3",
    tags: ["all"],
  },
  {
    image: "./image/portfolio/grid-2-4.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "4",
    tags: ["all", "seo"],
  },
  {
    image: "./image/portfolio/grid-2-5.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "5",
    tags: ["all", "development"],
  },
  {
    image: "./image/portfolio/grid-2-6.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "6",
    tags: ["all", "work"],
  },
  {
    image: "./image/portfolio/grid-2-7.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "7",
    tags: ["all", "marketing"],
  },
  {
    image: "./image/portfolio/grid-2-8.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "8",
    tags: ["all", "work"],
  },
  {
    image: "./image/portfolio/grid-2-3.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "3",
    tags: ["all"],
  },
  {
    image: "./image/portfolio/grid-2-4.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "4",
    tags: ["all", "seo"],
  },
  {
    image: "./image/portfolio/grid-2-5.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "5",
    tags: ["all", "development"],
  },
  {
    image: "./image/portfolio/grid-2-1.png",
    tag: "Web Design",
    title: "Colors Magazine",
    id: "5",
    tags: ["all", "development"],
  },
];

export default function PortfolioFour() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Portfolio grid–4 Columns",
          activePage: "Portfolio",
        },
      }}
    >
      <PortfolioSection
        gridCol="col-md-3 col-xs-6 mb-24"
        portfolioData={portfolioItems}
      />
    </PageWrapper>
  );
}
