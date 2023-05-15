import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Contact/ContactTwo/ContentSection";
export default function contactTwo() {
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
