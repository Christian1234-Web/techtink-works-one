const themeDefaultConfig = {
  header: {
    headerClasses:
      "site-header site-header--menu-center light-header position-relative",
    containerFluid: true,
    darkLogo: true,
  },
  footerType: "Info",
  // defaultLogo: siteLogo,
};
export const innerPageDefault = {
  pageWrapperClass: "theme-1",
  header: {
    headerClasses:
      "site-header--menu-center bg-transparent site-header--menu-center-adjustment",
    doubleButton: {
      wrapperClass: "site-header__btns--01",
      btnOneText: "Login",
      btnTwoText: "Sign Up",
      btnOneClass: "btn btn-transparent btn-1",
      btnTwoClass: "btn btn-primary btn-primary-hvr btn-2 rounded",
    },
  },
  footerType: "FooterInfo",
  innerpage: true,
  // defaultLogo: siteLogo,
};
export default themeDefaultConfig;
