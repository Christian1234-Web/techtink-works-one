import React from "react";
import { PageWrapper } from "~components/Core";
import PricingSection from "~components/layouts/Pricing/PricingStyleSeven";
import CtaSection from "~components/layouts/Cta/CtaStyleFour/CtaSection";
export default function PricingPageOne() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Pricing Tables",
          activePage: "Pricing Tables",
        },
      }}
    >
      <PricingSection />
      <CtaSection/>
    </PageWrapper>
  );
}
