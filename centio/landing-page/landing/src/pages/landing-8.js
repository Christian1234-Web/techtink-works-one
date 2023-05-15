import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleEight from "~components/layouts/Hero/HeroStyleEight";
import FeatureStyleSix from "~components/layouts/Feature/FeatureStyleSix";
import ServiceStyleTwo from "~components/layouts/Service/ServiceStyleTwo";
import TestimonialStyleEight from "~components/layouts/Testimonial/TestimonialStyleEight";
import AboutStyleFive from "~components/layouts/About/AboutStyleFive";
import ContentStyleSeventeen from "~components/layouts/Content/ContentStyleSeventeen";
import FactStyleFive from "~components/layouts/Fact/FactStyleFive";
import ContentStyleEighteen from "~components/layouts/Content/ContentStyleEighteen";
import CtaStyleEight from "~components/layouts/Cta/CtaStyleEight";
import TeamSectionTwo from "~components/layouts/Team/TeamStyleTwo";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--08",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
  innerPage:false,
};
export default function landingEight() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-7",
        header: headerConfig,
        footerType: "FooterInfo",
      }}
    >
      <HeroStyleEight />
      <FeatureStyleSix />
      <AboutStyleFive />
      <ContentStyleSeventeen />
      <ServiceStyleTwo />
      <FactStyleFive/>
      <ContentStyleEighteen />
      <TeamSectionTwo />
      <TestimonialStyleEight />
      <CtaStyleEight /> 
    </PageWrapper>
  );
}
