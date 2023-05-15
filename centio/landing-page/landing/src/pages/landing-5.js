import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleFive from "~components/layouts/Hero/HeroStyleFive";
import CtaStyleFive from "~components/layouts/Cta/CtaStyleFive";
import ContentStyleTwelve from "~components/layouts/Content/ContentStyleTwelve";
import AboutStyleTwo from "~components/layouts/About/AboutStyleTwo";
import VideoStyleTwo from "~components/layouts/Video/VideoStyleTwo";
import ContentStyleTen from "~components/layouts/Content/ContentStyleTen";
import FeatureStyleFive from "~components/layouts/Feature/FeatureStyleFive";
import TestimonialStyleFive from "~components/layouts/Testimonial/TestimonialStyleFive";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--dark site-header--menu-center-adjustment ",
  darkLogo: true,
  doubleButton: {
    wrapperClass: "site-header__btns--05",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
};
export default function landingFive() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-4",
        header: headerConfig,
        innerPage:false,
      }}
    >
      <HeroStyleFive />
      <AboutStyleTwo />
      <VideoStyleTwo />
      <ContentStyleTen />
      <ContentStyleTwelve />
      <FeatureStyleFive />
      <TestimonialStyleFive />
      <CtaStyleFive />
    </PageWrapper>
  );
}
