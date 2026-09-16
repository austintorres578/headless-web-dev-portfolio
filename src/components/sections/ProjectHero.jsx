import { Link } from "react-router-dom";

import styles from "./ProjectHero.module.css";

export default function ProjectHero() {
  return (
    <section className={styles["project-hero"]}>
      <div className={styles["section-wrapper"]}>
        <Link to="/" className={styles["back-home"]}>
          Back to home
        </Link>
        <div className={styles["tags"]}>
            <span>All Projects</span>
            <span>All Projects</span>
            <span>All Projects</span>
            <span>All Projects</span>
        </div>
        <h1>Game Database</h1>
        <p>
          A complete list of client work, tools, and side projects — filter by
          what you're looking for.
        </p>
        <div className={styles["project-categories"]}>
          <span>React</span>
          <span>Firebase</span>
          <span>Gemini API</span>
          <span>RAWG API</span>
        </div>
        <div className={styles["project-ctas"]}>
          <a href="#" className={styles["site"]}>
            View Live Site →
          </a>
          <a href="#" className={styles["github"]}>
            View on Github
          </a>
        </div>
      </div>
    </section>
  );
}
