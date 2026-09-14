import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

import siteLogo from "../../../public/images/site_logo.png";
import SocialLinks from "../ui/SocialLinks.jsx";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className={styles["site-header"]}>
      <div className={styles["site-header__inner"]}>
        <div className={styles["site-branding"]}>
          <a href="/" className={styles["site-logo"]} rel="home">
            <img src="/images/site_logo.png" alt="Austin Torres" />
          </a>
        </div>

        {/* <button className={styles['nav-toggle']} id="navToggle" aria-controls="primary-menu" aria-expanded="false">
                    <span className={styles['screen-reader-text']}>Menu</span>
                    <span className={styles['nav-toggle__bars']} aria-hidden="true">&#9776;</span>
                </button> */}

        <nav className={styles["main-navigation"]} aria-label="Primary">
          <ul id="primary-menu" className={styles["nav-menu"]}>
            <li>
              <a href="/">Tech</a>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>

        <a className={`${styles["orange-button"]} orange-button`} href="#">
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
            <a href="/">
              <img src="/images/site_logo.png"></img>
            </a>
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
              <a href="#">Tech</a>
              <Link to="/projects">Projects</Link>
              <a href="#">Contact</a>
              <a href="#">Resume</a>
            </nav>
          </div>
          <div>
            <a href="#" className={styles["mobile-resume-button"]}>
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
