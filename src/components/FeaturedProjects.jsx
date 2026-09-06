import styles from '../components/FeaturedProjects.module.css'
import ProjectCarousel from '../components/ProjectCarousel.jsx'
import ProjectBento from './ProjectBento.jsx'

// Placeholder content until these come from the CMS.
// const placeholderProject = {
//     href: '#',
//     categories: ['Category', 'Category', 'Category'],
//     title: 'Project Title',
//     type: 'Project Type',
//     subtitle: 'Project subtitle',
//     details: "Project details Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum cum omnis consectetur? Doloribus rem aut nam. Veniam nesciunt provident error, sapiente voluptatum in itaque culpa excepturi sequi minus deleniti aliquid.",
//     cta: 'Project CTA',
// }

// const projects = [
//     { ...placeholderProject, id: 1 },
//     { ...placeholderProject, id: 2 },
//     { ...placeholderProject, id: 3 },
//     { ...placeholderProject, id: 4 },
// ]

export default function FeaturedProjects() {
    return (
        <section className={styles["featured-project-section"]}>
            <div className={styles["section-wrapper"]}>
                <div className={styles['header-wrapper']}>
                    <div className={styles["generic-section-header"]}>
                        <span className={styles["eyebrow"]}>Featured Work</span>
                        <h2>Projects that solved a real problem</h2>
                        <p>Each of these started as a business need, not a design brief. Here's what the site had to do - and what to make it happen.</p>
                    </div>
                    <a href='#'><button className='orange-button'>View All Projects</button></a>
                </div>
                {/* <ProjectCarousel projects={projects} /> */}
                <ProjectBento />
            </div>
        </section>
    )
}
