import React from "react";
import { PageWrapper } from "~components/Core";
import HeroStyleNine from "~components/layouts/Hero/HeroStyleNine";
import BrandStyleThree from "~components/layouts/Brand/BrandStyleThree";
import AboutStyleSix from "~components/layouts/About/AboutStyleSix";
import ContentStyleNineteen from "~components/layouts/Content/ContentStyleNineteen";
import FactStyleSix from "~components/layouts/Fact/FactStyleSix";
import ContentStyleTwenty from "~components/layouts/Content/ContentStyleTwenty";
import ContentStyleTwentyOne from "~components/layouts/Content/ContentStyleTwentyOne";
import PricingStyleFive from "~components/layouts/Pricing/PricingStyleFive";
import TestimonialStyleNine from "~components/layouts/Testimonial/TestimonialStyleNine";
import CtaStyleNine from "~components/layouts/Cta/CtaStyleNine";
const headerConfig = {
  headerClasses:
    "site-header--menu-center bg-transparent site-header--dark site-header--menu-center-adjustment",
  darkLogo: true,
  doubleButton: {
    wrapperClass: "site-header__btns--09",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
  innerPage:false,
};

const BrandData = [
  {
    src: "./image/brand/brand-3/brand-1.png",
    id: "s1b1",
  },
  {
    src: "./image/brand/brand-3/brand-2.png",
    id: "s1b2",
  },
  {
    src: "./image/brand/brand-3/brand-3.png",
    id: "s1b3",
  },
  {
    src: "./image/brand/brand-3/brand-4.png",
    id: "s1b4",
  },
  {
    src: "./image/brand/brand-3/brand-5.png",
    id: "s1b5",
  },
];
export default function landingNine() {
  return (
    <PageWrapper
      themeConfig={{
        pageWrapperClass: "theme-4",
        header: headerConfig,
        footerType: "FooterInfo",
      }}
    >
      <HeroStyleNine />
      <BrandStyleThree data={BrandData} className="bg-bule" />
      <AboutStyleSix />
      <ContentStyleNineteen />
      <FactStyleSix />
      <ContentStyleTwenty />
      <ContentStyleTwentyOne />
      <PricingStyleFive />
      <TestimonialStyleNine />
      <CtaStyleNine />
    </PageWrapper>
  );
}
