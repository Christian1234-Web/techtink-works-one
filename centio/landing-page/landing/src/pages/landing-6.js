import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleSix from "~components/layouts/Hero/HeroStyleSix";
import BrandStyleTwo from "~components/layouts/Brand/BrandStyleTwo";
import AboutSectionThree from "~components/layouts/About/AboutStyleThree";
import ContentStyleThirteen from "~components/layouts/Content/ContentStyleThirteen";
import ContentStyleFourthirteen from "~components/layouts/Content/ContentStyleFourthirteen";
import ServiceStyleOne from "~components/layouts/Service/ServiceStyleOne";
import CtaStyleSix from "~components/layouts/Cta/CtaStyleSix";
import PricingStyleThree from "~components/layouts/Pricing/PricingStyleThree";
import TestimonialStyleSix from "~components/layouts/Testimonial/TestimonialStyleSix";
import FactStyleFour from "~components/layouts/Fact/FactStyleFour";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--06",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary-hvr btn-2 rounded",
  },
};
export default function landingSix() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-5",
        header: headerConfig,
        footerType: "FooterInfo",
        innerPage:false
      }}
    >
      <HeroStyleSix />
      <BrandStyleTwo />
      <AboutSectionThree />
      <ContentStyleThirteen />
      <FactStyleFour />
      <ServiceStyleOne />
      <ContentStyleFourthirteen />
      <PricingStyleThree />
      <TestimonialStyleSix />
      <CtaStyleSix />
    </PageWrapper>
  );
}
