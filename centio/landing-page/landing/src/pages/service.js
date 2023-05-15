import React from "react";
import { PageWrapper } from "~components/Core";
import CtaSection from "~components/layouts/Cta/CtaStyleFour";
import ServiceStyleThree from "~components/layouts/Service/ServiceStyleThree";
import ContentStyleEight from "~components/layouts/Content/ContentStyleEight";
import PricingSection from "~components/layouts/Pricing/PricingStyleTwo";
import TestimonialStyleFive from "~components/layouts/Testimonial/TestimonialStyleFive";
export default function service() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Our Services",
          activePage: "Services",
        },
      }}
    >
      <ServiceStyleThree />
      <ContentStyleEight />
      <PricingSection subColor="text-green" />
      <TestimonialStyleFive />
      <CtaSection />
    </PageWrapper>
  );
}
