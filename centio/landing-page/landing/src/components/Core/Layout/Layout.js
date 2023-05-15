import React, { useContext } from "react";
import Head from "next/head";
import favicon from "~image/favicon.png";
import GlobalContext from "../../../context/GlobalContext";
import Header from "../Header";
import FooterSection from "~components/layouts/Footer/FooterStyleOne/FooterSection";
import Breadcrumb from "~components/layouts/Breadcrumb";
export default function Layout({ children }) {
  const { theme } = useContext(GlobalContext);
  return (
    <>
      <Head>
        <title>Custer Next Landing Template</title>
        <link rel="icon" type="image/png" href={favicon.src} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=0"
        />
      </Head>
      <div
        className={`site-wrapper overflow-hidden ${
          theme.pageWrapperClass ? "" + theme.pageWrapperClass : ""
        }`}
      >
        <Header/>
        {theme.innerPage ? (
          <Breadcrumb
            column={theme?.innerPage?.breadcrumbColumn}
            title={theme?.innerPage?.breadcrumbTitle}
            text={theme?.innerPage?.breadcrumbText}
            activePage = {theme?.innerPage?.activePage}
          />
        ) : null}
        {children}
        { theme.footerHide ? null : <FooterSection type={theme.footerType} />}
        
      </div>
    </>
  );
}
