import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Contact/ContactOne/ContentSection";
export default function contactOne() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Contact Us",
          activePage: "Contact",
        },
      }}
    >
      <ContentSection />
    </PageWrapper>
  );
}
