import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import styles from "./Header.module.css";

import SocialLinks from "../ui/SocialLinks";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? styles["active"] : undefined;

  return (
    <header className={styles["site-header"]}>
      <div className={styles["site-header__inner"]}>
        <div className={styles["site-branding"]}>
          <Link to="/" className={styles["site-logo"]} rel="home">
            <img src="/images/site_logo.png" alt="Austin Torres" />
          </Link>
        </div>

        {/* <button className={styles['nav-toggle']} id="navToggle" aria-controls="primary-menu" aria-expanded="false">
                    <span className={styles['screen-reader-text']}>Menu</span>
                    <span className={styles['nav-toggle__bars']} aria-hidden="true">&#9776;</span>
                </button> */}

        <nav className={styles["main-navigation"]} aria-label="Primary">
          <ul id="primary-menu" className={styles["nav-menu"]}>
            <li>
              <NavLink className={navLinkClass} to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClass} to="/contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        <a className={`${styles["orange-button"]} orange-button`} href="/Austin_Torres_Resume.pdf" download>
          Resume
        </a>
        <button
          className={styles["ham-menu-button"]}
          onClick={() => setMobileNavOpen(true)}
          aria-controls="mobile-nav"
          aria-expanded={mobileNavOpen}
        >
          <img src="/images/hamburger-menu-white.svg" alt="Open menu"></img>
        </button>
      </div>
      <div
        id="mobile-nav"
        className={`${styles["mobile-nav-con"]}${mobileNavOpen ? "" : ` ${styles["invisible"]}`}`}
      >
        <div className={styles["mobile-nav-wrapper"]}>
          <div>
            <Link to="/" className={styles["site-logo"]} rel="home">
              <img src="/images/site_logo.png" alt="Austin Torres" />
            </Link>
            <button
              className={styles["close-button"]}
              onClick={() => setMobileNavOpen(false)}
            >
              ✕
            </button>
            <nav
              onClick={(e) => {
                if (e.target.closest("a")) setMobileNavOpen(false);
              }}
            >
              <NavLink className={navLinkClass} to="/#tech">Tech</NavLink>
              <NavLink className={navLinkClass} to="/projects">Projects</NavLink>
              <NavLink className={navLinkClass} to="/contact">Contact</NavLink>
            </nav>
          </div>
          <div>
            <a href="/Austin_Torres_Resume.pdf" download className={styles["mobile-resume-button"]}>
              Resume
            </a>
            <div className={styles["mobile-socials"]}>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
