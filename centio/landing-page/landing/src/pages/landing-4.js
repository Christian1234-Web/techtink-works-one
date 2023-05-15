import React from "react";
import { PageWrapper } from "~components/Core";
import HeroSection from "~components/layouts/Hero/HeroStyleFour";
import BrandSection from "~components/layouts/Brand/BrandStyleTwo";
import ContentStyleNine from "~components/layouts/Content/ContentStyleNine";
import CtaSection from "~components/layouts/Cta/CtaStyleFour/CtaSection";
import FactStyleThree from "~components/layouts/Fact/FactStyleThree";
import PricingSection from "~components/layouts/Pricing/PricingStyleTwo";
import FeatureSection from "~components/layouts/Feature/FeatureStyleFour";
import ContentStyleEight from "~components/layouts/Content/ContentStyleEight";
import TestimonialStyleFour from "~components/layouts/Testimonial/TestimonialStyleFour";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--04",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-2 rounded",
  },
};
export default function landingFour() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-4",
        header: headerConfig,
        footerType: "FooterInfo",
        innerPage:false,
      }}
    >
      <HeroSection />
      <BrandSection />
      <ContentStyleNine />
      <FeatureSection />
      <ContentStyleEight />
      <PricingSection subColor="text-secondary" />
      <FactStyleThree widgetMode="light" />
      <TestimonialStyleFour />
      <CtaSection />
    </PageWrapper>
  );
}
