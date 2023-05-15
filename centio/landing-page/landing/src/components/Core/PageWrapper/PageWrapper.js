import React from "react";
import { innerPageDefault } from "~data/themeDefaultConfig";
import GlobalContext, { themeDefault } from "../../../context/GlobalContext";
 const PageWrapper= ({ children, themeConfig = null})=> {  
    const activeHeader = ( themeConfig?.innerPage ? innerPageDefault : themeDefault );  
    const sitectx = React.useContext(GlobalContext);
    React.useEffect(() => {
        sitectx.changeTheme({ ...activeHeader, ...themeConfig });
    },[themeConfig]);
    return (
      <>
        {children}
      </>
    )
}

export default PageWrapper;