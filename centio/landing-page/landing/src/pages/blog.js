import React from "react";
import { PageWrapper } from "~components/Core";
import ContentSection from "~components/layouts/Blog/Blog";
export default function blog() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbColumn: "col-xl-8 col-lg-8 col-md-10 col-sm-11 col-xs-11",
          breadcrumbTitle: "Blog",
          breadcrumbText:
            "An enim nullam tempor sapien gravida donec enim ipsum porta justo congue purus <br class='d-none d-xl-block'/> pretium ligula sapien gravida donec enim ipsum poc enim ipsum porta",
          activePage: "Blog",
        },
      }}
    >
      <ContentSection />
    </PageWrapper>
  );
}
