import { useState, useEffect } from 'react'
import ProjectCard from './ProjectCard.jsx'
import { fetchProjects } from '../../lib/wpProjects.js'

import styles from './ProjectBento.module.css'

const FEATURED_COUNT = 3

export default function ProjectBento() {
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        let cancelled = false

        fetchProjects()
            .then((data) => {
                if (cancelled) return
                setProjects(data)
                setStatus('ready')
            })
            .catch((error) => {
                if (cancelled) return
                console.error('Failed to load featured projects:', error)
                setStatus('error')
            })

        return () => {
            cancelled = true
        }
    }, [])

    if (status === 'error') {
        return <p>Couldn&apos;t load featured projects right now.</p>
    }

    const featured = projects.filter((project) => project.isFeatured)
    const rest = projects.filter((project) => !project.isFeatured)
    const selected = [...featured, ...rest].slice(0, FEATURED_COUNT)

    return (
        <div className={styles['bento-grid']}>
            {status === 'ready' && selected.map((project, index) => (
                <ProjectCard
                    key={project.id}
                    href={project.href}
                    featured={index === 0}
                    tags={project.tags}
                    meta={
                        index === 0 && project.isFeatured
                            ? [project.meta, 'Featured'].filter(Boolean).join(' · ')
                            : project.meta
                    }
                    title={project.title}
                    description={project.description}
                    featuredImage={project.featuredImage}
                />
            ))}
        </div>
    )
}
