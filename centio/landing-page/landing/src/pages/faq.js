import React from "react";
import { PageWrapper } from "~components/Core";
import FaqSection from "~components/layouts/Faq/FaqBody";
export default function faq() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbColumn: "col-md-10 col-sm-11 col-xs-11",
          breadcrumbTitle: "Frequently Asked Questions",
          breadcrumbText:
            "An enim nullam tempor sapien gravida donec enim ipsum porta justo congue purus <br class='d-none d-xl-block'/> pretium ligula sapien gravida donec enim ipsum poc enim ipsum porta",
          activePage: "FAQ",
        },
      }}
    >
      <FaqSection />
    </PageWrapper>
  );
}
