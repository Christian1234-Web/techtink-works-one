import React from "react";
import { PageWrapper } from "~components/Core";
import HeroSection from "~components/layouts/Hero/HeroStyleThree";
import BrandSection from "~components/layouts/Brand/BrandStyleOne";
import ContentSectionOne from "~components/layouts/Content/ContentStyleFive";
import ContentSectionTwo from "~components/layouts/Content/ContentStyleSix";
import CtaSection from "~components/layouts/Cta/CtaStyleThree";
import FactSection from "~components/layouts/Fact/FactStyleTwo";
import FeatureSection from "~components/layouts/Feature/FeatureStyleThree";
import TestimonialStyleThree from "~components/layouts/Testimonial/TestimonialStyleThree";
import ContentStyleSeven from "~components/layouts/Content/ContentStyleSeven";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--03",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-2 rounded btn-primary-hvr",
  },
};

const counterData = [
  {
    id: "fl301",
    iconImage: "./image/home-3/fact-icon-1.png",
    title: "<span class='counter'>28</span>K",
    text: "Users",
  },
  {
    id: "fl302",
    iconImage: "./image/home-3/fact-icon-2.png",
    title: "<span class='counter'>13</span>K",
    text: "Download",
  },
  {
    id: "fl303",
    iconImage: "./image/home-3/fact-icon-3.png",
    title: "<span class='counter'>68</span>K",
    text: "Likes",
  },
  {
    id: "fl304",
    iconImage: "./image/home-3/fact-icon-4.png",
    title: "<span class='counter'>10</span>K",
    text: "5 Star Rating",
  },
];
export default function landingThree() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-3",
        header: headerConfig,
        footerType: "FooterInfo",
        innerPage:false,
      }}
    >
      <HeroSection />
      <BrandSection />
      <FeatureSection />
      <ContentSectionOne />
      <ContentSectionTwo />
      <ContentStyleSeven />
      <FactSection
        data={counterData}
        className="bg-white-op02"
        widgetMode="dark"
      />
      <TestimonialStyleThree />
      <CtaSection />
    </PageWrapper>
  );
}
