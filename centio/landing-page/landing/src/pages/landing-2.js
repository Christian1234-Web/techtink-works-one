import React from "react";
import { PageWrapper } from "~components/Core";
import HeroSection from "~components/layouts/Hero/HeroStyleTwo";
import FeatureSection from "~components/layouts/Feature/FeatureStyleTwo";
import AboutSection from "~components/layouts/About/AboutStyleOne";
import ContentSectionOne from "~components/layouts/Content/ContentStyleThree";
import ContentSectionTwo from "~components/layouts/Content/ContentStyleFour";
import PricingSection from "~components/layouts/Pricing/PricingStyleOne";
import TestimonialStyleTwo from "~components/layouts/Testimonial/TestimonialStyleTwo";
import FactSection from "~components/layouts/Fact/FactStyleTwo";
import CtaSection from "~components/layouts/Cta/CtaStyleTwo/CtaSection";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--02",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-2 rounded",
  },
};
export default function landingTwo() {
  return (
    <PageWrapper
      themeConfig={{ pageWrapperClass: "theme-2", header: headerConfig,innerPage:false }}
    >
      <HeroSection />
      <FeatureSection />
      <AboutSection />
      <ContentSectionOne />
      <ContentSectionTwo />
      <PricingSection />
      <FactSection widgetMode="dark"/>
      <TestimonialStyleTwo />
      <CtaSection />
    </PageWrapper>
  );
}
