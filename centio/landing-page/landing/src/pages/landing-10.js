import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleTen from "~components/layouts/Hero/HeroStyleTen";
import BrandStyleThree from "~components/layouts/Brand/BrandStyleThree";
import PricingStyleSix from "~components/layouts/Pricing/PricingStyleSix";
import FactStyleSeven from "~components/layouts/Fact/FactStyleSeven";
import ContentStyleTwentyTwo from "~components/layouts/Content/ContentStyleTwentyTwo";
import ContentStyleTwentyThree from "~components/layouts/Content/ContentStyleTwentyThree";
import FeatureStyleSeven from "~components/layouts/Feature/FeatureStyleSeven";
import CtaStyleTen from "~components/layouts/Cta/CtaStyleTen";
import TestimonialStyleTen from "~components/layouts/Testimonial/TestimonialStyleTen";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--menu-center-adjustment",
  doubleButton: {
    wrapperClass: "site-header__btns--10",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
  innerPage:false,
};
const BrandData = [
  {
    src: "./image/brand/brand-2/brand-1.png",
    id: "s1b1",
  },
  {
    src: "./image/brand/brand-2/brand-2.png",
    id: "s1b2",
  },
  {
    src: "./image/brand/brand-2/brand-3.png",
    id: "s1b3",
  },
  {
    src: "./image/brand/brand-2/brand-4.png",
    id: "s1b4",
  },
  {
    src: "./image/brand/brand-2/brand-5.png",
    id: "s1b5",
  },
];
export default function landingTen() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-6",
        header: headerConfig,
        footerType: "FooterInfo",
      }}
    >
      <HeroStyleTen />
      <FactStyleSeven />
      <BrandStyleThree data={BrandData} className="brand-section-modifi--04" />
      <ContentStyleTwentyTwo />
      <FeatureStyleSeven />
      <ContentStyleTwentyThree />
      <PricingStyleSix />
      <TestimonialStyleTen />
      <CtaStyleTen />
    </PageWrapper>
  );
}
