import styles from './ExperienceSection.module.css'

export default function ExperienceSection() {
    return (
        <section className={styles["experience-section"]}>
            <div className={styles["section-wrapper"]}>
                <div className={styles["generic-section-header"]}>
                    <div>
                        <span className={styles["eyebrow"]}>EXPERIENCE</span>
                        <h2>Where I've done the work</h2>
                        <p>Professional, paid experience — not bootcamp projects or tutorials.</p>
                    </div>
                    <span>Currently employed, open to new roles</span>
                </div>
                <div className={styles["timeline"]}>
                    <div className={styles["timeline-item"] + " " + styles["current"]}>
                        <div className={styles["timeline-dot"]}></div>
                        <div className={styles["timeline-card"]}>
                            <div className={styles["card-titlebar"]}>
                                <span className={styles["card-dot"] + " " + styles["red"]}></span>
                                <span className={styles["card-dot"] + " " + styles["yellow"]}></span>
                                <span className={styles["card-dot"] + " " + styles["green"]}></span>
                                <span className={styles["card-titlebar-label"]}>kraus-marketing — role.log</span>
                            </div>
                            <div className={styles["card-body"]}>
                                <div className={styles["timeline-top"]}>
                                    <h3>Web Developer<span className={styles["current-badge"]}>Current</span></h3>
                                    <span className={styles["timeline-dates"]}>Mar 2023 — Present</span>
                                </div>
                                <div className={styles["timeline-company"]}>Kraus Marketing · Morristown, NJ</div>
                                <p className={styles["desc"]}>Developed 20+ WordPress websites across multiple industries, translating Figma designs into pixel-perfect, accessible, mobile-friendly pages. Collaborated directly with clients and developers on debugging, feature planning, and performance optimization.</p>
                                <div className={styles["timeline-tags"]}>
                                    <span>WordPress</span><span>PHP</span><span>Accessibility</span><span>SEO</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["timeline-item"]}>
                        <div className={styles["timeline-dot"]}></div>
                        <div className={styles["timeline-card"]}>
                            <div className={styles["card-titlebar"]}>
                                <span className={styles["card-dot"] + " " + styles["red"]}></span>
                                <span className={styles["card-dot"] + " " + styles["yellow"]}></span>
                                <span className={styles["card-dot"] + " " + styles["green"]}></span>
                                <span className={styles["card-titlebar-label"]}>relevant-local-media — role.log</span>
                            </div>
                            <div className={styles["card-body"]}>
                                <div className={styles["timeline-top"]}>
                                    <h3>Web Developer</h3>
                                    <span className={styles["timeline-dates"]}>Nov 2022 — Feb 2023</span>
                                </div>
                                <div className={styles["timeline-company"]}>Relevant Local Media · Wayne, NJ</div>
                                <p className={styles["desc"]}>Launched WordPress websites for restaurant clients, tailoring features to industry needs. Built a custom React form integrated with the Monday API to streamline client onboarding.</p>
                                <div className={styles["timeline-tags"]}>
                                    <span>WordPress</span><span>React</span><span>Monday API</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles["timeline-item"]}>
                        <div className={styles["timeline-dot"]}></div>
                        <div className={styles["timeline-card"]}>
                            <div className={styles["card-titlebar"]}>
                                <span className={styles["card-dot"] + " " + styles["red"]}></span>
                                <span className={styles["card-dot"] + " " + styles["yellow"]}></span>
                                <span className={styles["card-dot"] + " " + styles["green"]}></span>
                                <span className={styles["card-titlebar-label"]}>austin-web-works — role.log</span>
                            </div>
                            <div className={styles["card-body"]}>
                                <div className={styles["timeline-top"]}>
                                    <h3>Freelance Developer — Austin Web Works</h3>
                                    <span className={styles["timeline-dates"]}>Ongoing</span>
                                </div>
                                <div className={styles["timeline-company"]}>Self-employed · NJ</div>
                                <p className={styles["desc"]}>20+ WordPress builds for local NJ businesses, run alongside full-time work — handling client communication, scoping, and delivery independently start to finish.</p>
                                <div className={styles["timeline-tags"]}>
                                    <span>WordPress</span><span>Client Work</span><span>Project Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}