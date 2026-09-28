import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "./IndividualProject.module.css";

import ColorDiv from '../components/layout/ColorDiv'

import ProjectHero from "../components/sections/ProjectHero";
import projectPlaceholder from "../assets/projectPlaceholder.jpeg";

const WP_API_URL = 'https://cms.austinwebworks.dev/wp-json/wp/v2'

function decodeHtml(str) {
  if (!str) return '';
  return new DOMParser().parseFromString(String(str), 'text/html').documentElement.textContent;
}

function toParagraphs(value) {
  if (!value) return [];
  const text = String(value)
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  return decodeHtml(text)
    .split(/\r?\n\s*\r?\n/)
    .map((piece) => piece.trim())
    .filter(Boolean);
}

function parseLines(value) {
  if (!value) return [];
  return String(value)
    .split(/\r?\n/)
    .map((line) => decodeHtml(line.trim()))
    .filter(Boolean);
}

function parseTechStack(value) {
  if (!value) return [];
  return String(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const index = line.indexOf('::');
      if (index === -1) return { name: decodeHtml(line), description: '' };
      return {
        name: decodeHtml(line.slice(0, index).trim()),
        description: decodeHtml(line.slice(index + 2).trim()),
      };
    })
    .filter((item) => item.name);
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json();
}

function ProjectPage({ slug }) {
  const [project, setProject] = useState(null);
  // status is one of 'loading' | 'ready' | 'not-found' | 'error'
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchJson(`${WP_API_URL}/project?slug=${encodeURIComponent(slug)}`),
      fetchJson(`${WP_API_URL}/tags?per_page=100`),
      fetchJson(`${WP_API_URL}/categories?per_page=100`),
    ])
      .then(([data, tagTerms, categoryTerms]) => {
        if (cancelled) return;
        if (data.length === 0) {
          setStatus('not-found');
          return;
        }

        const tagNames = new Map(tagTerms.map((term) => [term.id, term.name]));
        const categoryNames = new Map(categoryTerms.map((term) => [term.id, term.name]));

        const post = data[0];
        const acf = post.acf || {};
        const category =
          Array.isArray(acf.categorymeta) && acf.categorymeta.length > 0
            ? decodeHtml(categoryNames.get(acf.categorymeta[0]))
            : '';

        setProject({
          title: decodeHtml(post.title?.rendered),
          subtitle: acf.subtitletag_line || '',
          category,
          eyebrow: [category, acf.employer].filter(Boolean),
          tags: Array.isArray(acf.tags)
            ? acf.tags.map((id) => decodeHtml(tagNames.get(id))).filter(Boolean)
            : [],
          liveSiteUrl: acf.live_site_url || '',
          githubUrl: acf.github_url || '',
          problem: toParagraphs(acf.problem_statement),
          solution: toParagraphs(acf.solution_description),
          techStack: parseTechStack(acf.tech_stack),
          results: parseLines(acf.results),
        });
        setStatus('ready');
      })
      .catch((error) => {
        if (cancelled) return;
        console.error('WP project fetch failed:', error);
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className={styles["indiv-project-page-container"]}>
        <section><div className={styles["section-wrapper"]}><p>Loading project…</p></div></section>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles["indiv-project-page-container"]}>
        <section><div className={styles["section-wrapper"]}><p>Couldn't load this project right now.</p></div></section>
      </div>
    );
  }

  if (status === 'not-found') {
    return (
      <div className={styles["indiv-project-page-container"]}>
        <section>
          <div className={styles["section-wrapper"]}>
            <h2>Project not found</h2>
            <Link to="/projects" className={styles["project-button"]}>All Projects</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <>
      <ProjectHero
        title={project.title}
        subtitle={project.subtitle}
        eyebrow={project.eyebrow}
        tags={project.tags}
        liveSiteUrl={project.liveSiteUrl}
        githubUrl={project.githubUrl}
      />
      <div className={styles["indiv-project-page-container"]}>
        <section className={styles["project-screenshot-container"]}>
          <div className={styles["section-wrapper"]}>
            <img src={projectPlaceholder} alt="Project Screenshot" />
          </div>
        </section>
        {project.problem.length > 0 && (
          <section className={styles["problem-section"]}>
            <div className={styles["section-wrapper"]}>
              <div className={styles["indiv-project-section-header"]}>
                <span className={styles["eyebrow"]}>The Problem</span>
                <h2>What needed solving</h2>
              </div>
              {project.problem.map((text, i) => <p key={i}>{text}</p>)}
            </div>
          </section>
        )}
        {project.solution.length > 0 && (
          <section className={styles["solution-section"]}>
            <div className={styles["section-wrapper"]}>
              <div className={styles["indiv-project-section-header"]}>
                <span className={styles["eyebrow"]}>What I Built</span>
                <h2>How I approached it</h2>
              </div>
              {project.solution.map((text, i) => <p key={i}>{text}</p>)}
            </div>
          </section>
        )}
        {project.techStack.length > 0 && (
          <section className={styles["tech-stack-section"]}>
            <div className={styles["section-wrapper"]}>
              <div className={styles["indiv-project-section-header"]}>
                <span className={styles["eyebrow"]}>Tech Stack</span>
                <h2>What I used, and why</h2>
              </div>
              <div className={styles["tech-stack-grid"]}>
                {project.techStack.map((item, i) => (
                  <div key={`${item.name}-${i}`}>
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {project.results.length > 0 && (
          <section className={styles["results-section"]}>
            <div className={styles["section-wrapper"]}>
              <div className={styles["indiv-project-section-header"]}>
                <span className={styles["eyebrow"]}>Results</span>
                <h2>What I Achieved</h2>
              </div>
              <div className={styles["solution-box"]}>
                <ul>
                  {project.results.map((text, i) => <li key={i}>{text}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}
        <section className={styles["indiv-project-nav"]}>
          <div className={styles["section-wrapper"]}>
            <div>
              <span>Next Project</span>
              <Link to="#">Soylent Clone </Link>
            </div>
            <Link to="/projects" className={styles["project-button"]}>All Projects</Link>
          </div>
        </section>
      </div>
      <ColorDiv />
    </>
  );
}

export default function IndividualProject() {
  const { slug } = useParams();
  // key={slug} remounts ProjectPage when the slug changes, so loading state resets.
  return <ProjectPage key={slug} slug={slug} />;
}
