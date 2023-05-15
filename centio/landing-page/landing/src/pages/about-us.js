import React from "react";
import { PageWrapper } from "~components/Core";
import VideoStyleThree from "~components/layouts/Video/VideoStyleThree";
import AboutStyleThree from "~components/layouts/About/AboutStyleThree";
import FactStyleFour from "~components/layouts/Fact/FactStyleFour";
import CtaSection from "~components/layouts/Cta/CtaStyleFour";
import TeamSection from "~components/layouts/Team/TeamStyleOne";
import BrandStyleTwo from "~components/layouts/Brand/BrandStyleTwo";
import ContentStyleTwentyFour from "~components/layouts/Content/ContentStyleTwentyFour";

export default function AboutUs() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "About Us",
          activePage: "About Us",
        },
      }}
    >
      <VideoStyleThree />
      <AboutStyleThree className="d-none" />
      <FactStyleFour className="bg-transparent" />
      <ContentStyleTwentyFour />
      <TeamSection className="bg-transparent" />
      <BrandStyleTwo className="brand-section-modifi--03" />
      <CtaSection />
    </PageWrapper>
  );
}
