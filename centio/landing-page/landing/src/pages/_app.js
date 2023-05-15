import { Layout } from "~components"
import Router from "next/router";
import AOS from "aos";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/react-modal-video/css/modal-video.min.css";
import "~fonts/fontawesome-5/css/all.min.css";
import "@/aos/dist/aos.css";
import "~scss/bootstrap.scss";
import "~scss/main.scss";
import "~scss/color-pallets.scss";
import "~fonts/typography-font/typo.css";
import { GlobalProvider , GlobalContext} from "../context/GlobalContext";
import { useEffect, useState } from "react";
// import "@/aos/aos.css"
import Loader from "~components/Core/Preloader";
function MyApp({ Component, pageProps }) {
  
  const [loader,setLoader] = useState(true);
  useEffect(() => {
    setTimeout(function(){
      setLoader(false);
      console.log("finished");
      AOS.init({
        easing: "ease-out-cubic",
        once: true,
        offset: 50,
      });
    } , 2000);
    
  }, []);

  Router.onRouteChangeStart = (url) => {
    // Some page has started loading
    setLoader(true) 
};

Router.onRouteChangeComplete = (url) => {
    // Some page has finished loading
    setTimeout(setLoader(false) , 1000) // set state to pass to loader prop
};
if(loader){
  return(<Loader show={loader}/>)
}
return(
<>
<GlobalProvider>
      <Layout>
      <Loader show={loader}/>
        <Component {...pageProps} />
      </Layout>
      </GlobalProvider>
</>
      )
  }
  
  export default MyApp