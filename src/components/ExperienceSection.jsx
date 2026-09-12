import SectionHeader from './SectionHeader.jsx'
import TimelineItem from './TimelineItem.jsx'

import styles from './ExperienceSection.module.css'

const EXPERIENCE = [
    {
        id: 'kraus-marketing',
        role: 'Web Developer',
        current: true,
        dates: 'Mar 2023 — Present',
        company: 'Kraus Marketing · Morristown, NJ',
        description: 'Developed 20+ WordPress websites across multiple industries, translating Figma designs into pixel-perfect, accessible, mobile-friendly pages. Collaborated directly with clients and developers on debugging, feature planning, and performance optimization.',
        tags: ['WordPress', 'PHP', 'Accessibility', 'SEO'],
    },
    {
        id: 'relevant-local-media',
        role: 'Web Developer',
        current: false,
        dates: 'Nov 2022 — Feb 2023',
        company: 'Relevant Local Media · Wayne, NJ',
        description: 'Launched WordPress websites for restaurant clients, tailoring features to industry needs. Built a custom React form integrated with the Monday API to streamline client onboarding.',
        tags: ['WordPress', 'React', 'Monday API'],
    },
    {
        id: 'austin-web-works',
        role: 'Freelance Developer — Austin Web Works',
        current: false,
        dates: 'Ongoing',
        company: 'Self-employed · NJ',
        description: '20+ WordPress builds for local NJ businesses, run alongside full-time work — handling client communication, scoping, and delivery independently start to finish.',
        tags: ['WordPress', 'Client Work', 'Project Management'],
    },
]

export default function ExperienceSection() {
    return (
        <section className={styles["experience-section"]}>
            <div className={styles["section-wrapper"]}>
                <div className={styles["generic-section-header"]}>
                    <SectionHeader
                        eyebrowClassName={styles["eyebrow"]}
                        eyebrow="EXPERIENCE"
                        title="Where I've done the work"
                        description="Professional, paid experience — not bootcamp projects or tutorials."
                    />
                    <span>Currently employed, open to new roles</span>
                </div>
                <div className={styles["timeline"]}>
                    {EXPERIENCE.map(item => <TimelineItem key={item.id} {...item} />)}
                </div>
            </div>
        </section>
    )
}
