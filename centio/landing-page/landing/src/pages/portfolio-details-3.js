import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Portfolios/PortfolioDetailsThree";
export default function portfolioDetailsThree() {
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
