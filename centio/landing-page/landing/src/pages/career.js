import React from "react";
import { PageWrapper } from "~components/Core";
import FactStyleFour from "~components/layouts/Fact/FactStyleFour";
import VideoStyleFour from "~components/layouts/Video/VideoStyleFour";
import CtaSection from "~components/layouts/Cta/CtaStyleFour";
import CareerService from "~components/layouts/Career/CareerService";
export default function career() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Career",
          activePage: "Career",
        },
      }}
    >
      <VideoStyleFour />
      <FactStyleFour />
      <CareerService />
      <CtaSection />
    </PageWrapper>
  );
}
