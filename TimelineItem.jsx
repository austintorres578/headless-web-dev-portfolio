import styles from '../sections/ExperienceSection.module.css'

// One role in the experience timeline. Styles live in ExperienceSection.module.css
// because the selectors are compound/parent-scoped to the timeline layout
// (e.g. `.timeline-item.current .timeline-dot`) and can't be split into their own file.
export default function TimelineItem({ id, role, current, dates, company, description, tags }) {
    return (
        <div className={current ? styles["timeline-item"] + " " + styles["current"] : styles["timeline-item"]}>
            <div className={styles["timeline-dot"]}></div>
            <div className={styles["timeline-card"]}>
                <div className={styles["card-titlebar"]}>
                    <span className={styles["card-dot"] + " " + styles["red"]}></span>
                    <span className={styles["card-dot"] + " " + styles["yellow"]}></span>
                    <span className={styles["card-dot"] + " " + styles["green"]}></span>
                    <span className={styles["card-titlebar-label"]}>{id} — role.log</span>
                </div>
                <div className={styles["card-body"]}>
                    <div className={styles["timeline-top"]}>
                        <h3>{role}{current && <span className={styles["current-badge"]}>Current</span>}</h3>
                        <span className={styles["timeline-dates"]}>{dates}</span>
                    </div>
                    <div className={styles["timeline-company"]}>{company}</div>
                    <p className={styles["desc"]}>{description}</p>
                    <div className={styles["timeline-tags"]}>
                        {tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
