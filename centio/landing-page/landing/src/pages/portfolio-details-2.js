import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Portfolios/PortfolioDetailsTwo";
export default function portfolioDetailsTwo() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Colors Magazine",
          activePage: "Portfolio Details",
        },
      }}
    >
      <ContentSection />
    </PageWrapper>
  );
}
