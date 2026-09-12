import ProjectCard from './ProjectCard.jsx'

import styles from './ProjectBento.module.css'

const PROJECTS = [
    {
        href: '#',
        featured: true,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool · Featured',
        title: 'Game Database',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
]

export default function ProjectBento() {
    return (

        <div className={styles['bento-grid']}>
            {PROJECTS.map(project => <ProjectCard key={project.title} {...project} />)}
        </div>
    )
}
