import { Link } from "react-router-dom";

import styles from "./ProjectHero.module.css";

export default function ProjectHero({
  title,
  subtitle,
  eyebrow = [],
  tags = [],
  liveSiteUrl,
  githubUrl,
}) {
  const hasCtas = Boolean(liveSiteUrl) || Boolean(githubUrl);

  return (
    <section className={styles["project-hero"]}>
      <div className={styles["section-wrapper"]}>
        <Link to="/" className={styles["back-home"]}>
          Back to home
        </Link>
        {eyebrow.length > 0 && (
          <div className={styles["tags"]}>
            {eyebrow.map((item) => <span key={item}>{item}</span>)}
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {tags.length > 0 && (
          <div className={styles["project-categories"]}>
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}
        {hasCtas && (
          <div className={styles["project-ctas"]}>
            {liveSiteUrl && (
              <a
                href={liveSiteUrl}
                className={styles["site"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Site →
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                className={styles["github"]}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Github
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
