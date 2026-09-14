import styles from './AllProjectsCon.module.css'

export default function AllProjectsCon() {
    return (
        <section className={styles["all-projects-con"]}>
            <div className={styles["project-filter-pills"]}>
                <div className={styles['project-filter-pills-wrapper']}>
                    <button className={styles["active"]}>All</button>
                    <button>React</button>
                    <button>Wordpress</button>
                    <button>E-commerce</button>
                    <button>Tools</button>
                </div>
            </div>
            <div className={styles["section-wrapper"]}>
                <div className={styles["projects-con"]}>

                </div>
                <div className={styles["project-pagination"]}>
                    
                </div>
            </div>
        </section>
    )
}