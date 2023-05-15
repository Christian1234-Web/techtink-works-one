import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Blog/BlogDetails";
export default function blogDetails() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbColumn:
            "col-xxl-12 col-xl-10 col-lg-10 col-md-10 col-sm-11 col-xs-11",
          breadcrumbTitle:
            "Human-Readable JavaScript: How to Compile & Run Your First Java Program",
          breadcrumbText:
            "An enim nullam tempor sapien gravida donec enim ipsum porta justo  congue <br class='d-none d-xl-block'>purus pretium ligula gravida donec enim ipsum",
          activePage: "Blog",
        },
      }}
    >
      <ContentSection />
    </PageWrapper>
  );
}
