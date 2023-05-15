import React from "react";
import { PageWrapper } from "~components/Core";
import HeroSection from "~components/layouts/Hero/HeroStyleOne";
import BrandSection from "~components/layouts/Brand/BrandStyleOne";
import FeatureSection from "~components/layouts/Feature/FeatureStyleOne";
import ContentSectionOne from "~components/layouts/Content/ContentStyleOne";
import ContentSectionTwo from "~components/layouts/Content/ContentSyleTwo";
import VideoSection from "~components/layouts/Video/VideoStyleOne";
import TeamSection from "~components/layouts/Team/TeamStyleOne";
import FactSection from "~components/layouts/Fact/FactStyleOne";
import TestimonialStyleOne from "~components/layouts/Testimonial/TestimonialStyleOne";
import CtaSection from "~components/layouts/Cta/CtaStyleOne";

const headerConfig = {
  headerClasses: "site-header--menu-left bg-transparent",
  doubleButton: {
    wrapperClass: "site-header__btns--01",
    btnOneText: "Login",
    btnTwoText: "Sign Up",
    btnOneClass: "btn btn-transparent btn-1",
    btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
  },
};
export default function landingOne() {
  return (
    <PageWrapper
      themeConfig={{ pageWrapperClass: "theme-1", header: headerConfig,innerPage:false, }}
    >
      <HeroSection />
      <BrandSection />
      <FeatureSection />
      <ContentSectionOne />
      <VideoSection />
      <ContentSectionTwo />
      <TeamSection />
      <FactSection />
      <TestimonialStyleOne/>
      <CtaSection />
    </PageWrapper>
  );
}
