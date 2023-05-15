import React from "react";
import themeDefaultConfig from "~data/themeDefaultConfig"
export const themeDefault = themeDefaultConfig;
const GlobalContext = React.createContext();

const GlobalProvider = ({children}) =>{
  const [theme , setTheme] = React.useState(themeDefault);

  const changeTheme = (themeConfig = themeDefault) => {
    setTheme({
      ...theme,
      ...themeConfig,
    });
  };
  // console.log(GlobalThemeContext);
  return (<GlobalContext.Provider value={{theme,changeTheme}}>
    {children}
  </GlobalContext.Provider>)
}


export default GlobalContext;
export { GlobalProvider };