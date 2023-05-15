import React, { useContext, useState } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { Container } from "react-bootstrap";
import GlobalContext from "../../../context/GlobalContext";
import SiteNav from "./SiteNav";
import SiteHeader from "./style";
import HeaderDoubleButton from "./HeaderDoubleButton";
import HeaderButton from "./HeaderButton";

const Header = () => {
  const [showScrolling, setShowScrolling] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);
  const themeContext = useContext(GlobalContext);
  const header = themeContext.theme.header;
  // console.log(themeContext)
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < 0) {
      setShowScrolling(true);
    } else {
      setShowScrolling(false);
    }
    if (currPos.y < -300) {
      setShowReveal(true);
    } else {
      setShowReveal(false);
    }
  });
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  if (!header) {
    return null;
  }
  return (
    <SiteHeader
      className={`${header.headerClasses} ${showScrolling ? "scrolling" : ""} ${
        showReveal ? "reveal-theme " : ""
      }`}
    >
      <Container fluid={header.containerFluid ? true : false}>
        <SiteNav
          defaultLogo={header.defaultLogo}
          customLogo={header.customLogo}
          darkLogo={header.darkLogo}
          buttonBlock={header.doubleButton ? <HeaderDoubleButton
              btnWrapperClasses={header?.doubleButton?.wrapperClass}
              btnOneText={header?.doubleButton?.btnOneText}
              btnTwoText={header?.doubleButton?.btnTwoText}
              btnOneClasses={header?.doubleButton?.btnOneClass}
              btnTwoClasses={header?.doubleButton?.btnTwoClass}
            />: header.button ? <HeaderButton
            btnWrapperClasses={header?.button?.wrapperClass}
            btnText={header?.button?.btnText}
            btnClasses={header?.button?.btnClass}
          />:null}
        />
      </Container>
    </SiteHeader>
  );
};
export default Header;
