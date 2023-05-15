import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Services/ServiceDetails/ContentSection";
import CtaSection from "~components/layouts/Cta/CtaStyleFour";
export default function serviceDetails() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Wealth Nuturing",
          activePage: "Services",
        },
      }}
    >
      <ContentSection />
      <CtaSection />
    </PageWrapper>
  );
}
