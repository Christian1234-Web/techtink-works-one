import React from "react";
import { PageWrapper } from "~components/Core";
import PortfolioSection from "~components/layouts/Portfolio/PortfolioLayout";

export default function Portfolio() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Portfolio grid–2 Columns",
          activePage: "Portfolio",
        },
      }}
    >
      <PortfolioSection gridCol="col-xs-6 mb-24" />
    </PageWrapper>
  );
}
