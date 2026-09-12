import { Link } from "react-router-dom";

import styles from "../components/HomeHero.module.css";
import SocialLinks from "./SocialLinks.jsx";

export default function HomeHero() {
  return (
    <section className={styles["home-hero"]}>
      <div className={styles["section-wrapper"]}>
        <div className={styles["hero-content"]}>
          <span className={styles["pretext"]}>
            Freelance Web Developer · NJ
          </span>
          <h1>
            <strong>Front-end developer</strong> building fast, accessible
            interfaces in <strong>React</strong> and <strong>WordPress</strong>
          </h1>
          <p>
            Pixel-perfect front-end work in React and WordPress, backed by real
            SEO. I started out building sites for local NJ businesses and I'm
            now pushing further into React — so the sites I build don't just
            look good, they get found and convert.
          </p>
          <div className={styles["button-flex"]}>
            <Link to="/" className={styles["orange-button"]}>
              See My Work
            </Link>
            <Link to="/" className={styles["transparent-button"]}>
              Start A Project
            </Link>

            <SocialLinks className={styles["social-circle"]} />
          </div>
        </div>
        <div className={styles["hero-austin"]}>
          <img src="/images/retro-austin.webp" alt="Austin Torres" />
        </div>
      </div>
    </section>
  );
}
