import { Link } from "react-router-dom";

import styles from "./IndividualProject.module.css";

import ColorDiv from '../components/layout/ColorDiv'

import ProjectHero from "../components/sections/ProjectHero";
import projectPlaceholder from "../assets/projectPlaceholder.jpeg";

export default function IndividualProject() {
  return (
    <>
      <ProjectHero />
      <div className={styles["indiv-project-page-container"]}>
        <section className={styles["project-screenshot-container"]}>
          <div className={styles["section-wrapper"]}>
            <img src={projectPlaceholder} alt="Project Screenshot" />
          </div>
        </section>
        <section className={styles["problem-section"]}>
          <div className={styles["section-wrapper"]}>
            <div className={styles["indiv-project-section-header"]}>
              <span className={styles["eyebrow"]}>The Problem</span>
              <h2>Manually logging a game collection is tedious</h2>
            </div>
            <p>
              Most game-tracking tools require typing in every title by hand,
              one at a time. For anyone with a shelf of 50+ physical or digital
              games, that's enough friction that most people never actually
              finish setting up their library — and abandon the tool before
              getting real value from it.
            </p>
          </div>
        </section>
        <section className={styles["solution-section"]}>
          <div className={styles["section-wrapper"]}>
            <div className={styles["indiv-project-section-header"]}>
              <span className={styles["eyebrow"]}>What I Built</span>
              <h2>A photo-to-library import pipeline</h2>
            </div>
            <p>
              Users take a single photo of their game shelf or collection. That
              image is sent to Google's Gemini API, which identifies each
              visible title. Rather than trusting the AI's read blindly, every
              identified title is cross-checked against the RAWG API's live game
              database — catching misreads, typos, or games Gemini identified
              with low confidence before they're added to the user's library.
            </p>

            <p>
              The result: a collection that would take 20+ minutes to enter by
              hand gets imported in under a minute, with a verification step the
              user can review before anything is saved.
            </p>
          </div>
        </section>
        <section className={styles["tech-stack-section"]}>
          <div className={styles["section-wrapper"]}>
            <div className={styles["indiv-project-section-header"]}>
              <span className={styles["eyebrow"]}>Tech Stack</span>
              <h2>What I used, and why</h2>
            </div>
            <div className={styles["tech-stack-grid"]}>
              <div>
                <span>React</span>
                <p>
                  Component-driven UI for the library grid, filters, and import
                  flow.
                </p>
              </div>
              <div>
                <span>React</span>
                <p>
                  Component-driven UI for the library grid, filters, and import
                  flow.
                </p>
              </div>
              <div>
                <span>React</span>
                <p>
                  Component-driven UI for the library grid, filters, and import
                  flow.
                </p>
              </div>
              <div>
                <span>React</span>
                <p>
                  Component-driven UI for the library grid, filters, and import
                  flow.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["results-section"]}>
          <div className={styles["section-wrapper"]}>
            <div className={styles["indiv-project-section-header"]}>
              <span className={styles["eyebrow"]}>Results</span>
              <h2>What I Achieved</h2>
            </div>
            <div className={styles["solution-box"]}>
              <ul>
                <li>Reduced average library setup time from ~20 minutes of manual entry to under 60 seconds</li>
                <li>Moved API keys out of client-side code into backend proxy routes, closing an exposed-key issue found during development</li>
                <li>Cross-verification step catches roughly 1 in 8 Gemini misreads before they reach the user's saved library</li>
              </ul>
            </div>
          </div>
        </section>
        <section className={styles["indiv-project-nav"]}>
          <div className={styles["section-wrapper"]}>
            <div>
              <span>Next Project</span>
              <Link to="#">Soylent Clone </Link>
            </div>
            <Link to="#" className={styles["project-button"]}>All Projects</Link>
          </div>
        </section>
      </div>
      <ColorDiv />
    </>
  );
}
