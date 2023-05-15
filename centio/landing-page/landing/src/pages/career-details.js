import React from "react";
import { PageWrapper } from "~components/Core";
import CareerDetails from "~components/layouts/Career/CareerDetails";

export default function CareerDetailsPage() {
  return (
    <PageWrapper
      themeConfig={{
        innerPage: {
          breadcrumbTitle: "Career Details",
          activePage: "Career details",
        },
      }}
    >
      <CareerDetails />
    </PageWrapper>
  );
}
