import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const ListLink = props => (
  <li style={{display: `inline-block`, marginRight: `1rem`, fontFamily: "Libre Caslon Text"}}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const SideLink = props => (
  <li style={{ marginRight: `1rem` }}>
    <Link to={props.to} style={{ textShadow: `none` }}>{props.children}</Link>
  </li>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        Hello!
      </h1>
    )
  }
  else if (/\/hp2\/?$/.test(location.pathname)) {
    header = (
      <h1 className="main-heading">
        Hello!
      </h1>
    )
  }
  else if (/\/(resources|about|portfolio|blog)\/$/.test(location.pathname)) {
    header = (
      <h1 className="main-heading">
        {title}
      </h1>
    )
  }
  /*
  else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }
  */

  function toggleChange() {
    document.querySelector('.mobile-hamburger-container').classList.toggle("expanded");
    document.querySelector('nav.sidenav').classList.toggle("expanded");
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        {header}
      <ul style={{ listStyle: `none`, float: `right` }}>
        <ListLink to="/blog/">Blog</ListLink>
        <ListLink to="/portfolio/">Portfolio</ListLink>
        {/* <ListLink to="/resume/">Resume</ListLink> */}
      </ul>
      </header>
      <main>{children}</main>
      <nav className="sidenav">
        <div className="mobile-hamburger-container" onClick={toggleChange}>
          <div className="mobile-hamburger-bar1"/>
          <div className="mobile-hamburger-bar2"/>
          <div className="mobile-hamburger-bar3"/>
        </div>
        <Link to="/">
          <StaticImage
            className="about-picture"
            layout="constrained"
            formats={["AUTO", "WEBP", "AVIF"]}
            src="../images/warp.png"
            quality={95}
            alt="WARP logo"
          />
        </Link>
        <ul style={{ listStyle: `none`}}>
          <SideLink to="/">Home</SideLink>
          <div className="mobile-only-sidenav-links">
            <SideLink to="/blog/">Blog</SideLink>
            <SideLink to="/portfolio/">Portfolio</SideLink>
          </div>
          <SideLink to="/resources/">Resources</SideLink>
          <SideLink to="/about/">About</SideLink>
        </ul>
      </nav>
      <footer className="global-footer">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
