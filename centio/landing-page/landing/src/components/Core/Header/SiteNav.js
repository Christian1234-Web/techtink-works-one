import React from "react"
import { Navbar } from "react-bootstrap"
import Menu from "./Menu"
const SiteNavbar = ({buttonBlock,darkLogo,customLogo,defaultLogo}) => {

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="site-navbar"
      >
        <Navbar.Brand href="/">

          {defaultLogo ? (<img src={defaultLogo.src} alt="site-brand"/>) : customLogo ? (
            <img src={customLogo.src} alt="site-brand" />
          ) : (
            <img src={darkLogo ? "image/logo/logo-dark.png" : "image/logo/logo-white.png"} alt="site-brand"/>
          )}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="hamburgur"
        />
        <Menu button={buttonBlock}/>
      </Navbar>
    </>
  )
}

export default SiteNavbar
