import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Portfolios/PortfolioDetailsOne";
export default function portfolioDetailsOne() {
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
