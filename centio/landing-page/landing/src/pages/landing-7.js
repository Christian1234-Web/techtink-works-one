import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleSeven from "~components/layouts/Hero/HeroStyleSeven";
import BrandStyleTwo from "~components/layouts/Brand/BrandStyleTwo";
import AboutStyleFour from "~components/layouts/About/AboutStyleFour";
import ContentStyleFifteen from "~components/layouts/Content/ContentStyleFifteen";
import FactSection from "~components/layouts/Fact/FactStyleTwo";
import ContentStyleSixteen from "~components/layouts/Content/ContentStyleSixteen";
import PricingStyleFour from "~components/layouts/Pricing/PricingStyleFour";
import CtaStyleSeven from "~components/layouts/Cta/CtaStyleSeven";
import TestimonialStyleSeven from "~components/layouts/Testimonial/TestimonialStyleSeven";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment ",
  doubleButton: {
    wrapperClass: "site-header__btns--07",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
};
const counterData = [
  {
    id: "fl301",
    iconImage: "./image/home-7/fact-icon-1.svg",
    title: "<span class='counter'>28</span>K",
    text: "Total Users",
  },
  {
    id: "fl302",
    iconImage: "./image/home-7/fact-icon-2.svg",
    title: "<span class='counter'>13</span>K",
    text: "Lifetime Downloads",
  },
  {
    id: "fl303",
    iconImage: "./image/home-7/fact-icon-3.svg",
    title: "<span class='counter'>68</span>K",
    text: "Social Likes",
  },
  {
    id: "fl304",
    iconImage: "./image/home-7/fact-icon-4.svg",
    title: "<span class='counter'>10</span>K",
    text: "5 Star Rating",
  },
];
export default function landingSeven() {
  return (
    <PageWrapper
      themeConfig={{ pageWrapperClass: "theme-6", header: headerConfig,innerPage:false }}
    >
      <HeroStyleSeven />
      <BrandStyleTwo />
      <AboutStyleFour />
      <ContentStyleFifteen />
      <ContentStyleSixteen />
      <FactSection
        data={counterData}
        className="counter-section-07"
        widgetMode="light"
      />
      <PricingStyleFour />
      <TestimonialStyleSeven />
      <CtaStyleSeven />
    </PageWrapper>
  );
}
