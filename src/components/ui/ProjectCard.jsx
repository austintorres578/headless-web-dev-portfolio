import styles from './ProjectBento.module.css'

// One card in the project bento grid. Styles live in ProjectBento.module.css
// because the selectors are compound/parent-scoped to the grid
// (e.g. `.bento-grid .project-card.featured`, `@container project-card`).
export default function ProjectCard({ href, featured, tags, meta, title, description }) {
    return (
        <a href={href} className={featured ? `${styles['project-card']} ${styles['featured']}` : styles['project-card']}>
            <div className={styles['project-image']}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className={styles['project-content']}>
                <p className={styles['meta']}>{meta}</p>
                <h3 className={styles['title']}>{title}</h3>
                <p className={styles['description']}>{description}</p>
                <div className={styles['cta']}>View Project →</div>
            </div>
        </a>
    )
}
