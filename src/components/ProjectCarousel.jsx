import { useState, useRef, useEffect, useCallback } from 'react'

import styles from '../components/ProjectCarousel.module.css'

export default function ProjectCarousel({ projects = [] }) {
    const trackRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    // Recalculate which arrows are usable. Runs on native scroll (touch,
    // trackpad, keyboard) as well as after button-driven scrolling.
    const updateArrows = useCallback(() => {
        const track = trackRef.current
        if (!track) return
        const maxScroll = track.scrollWidth - track.clientWidth
        // Sub-pixel layout rounding means scrollLeft rarely lands exactly on 0
        // or on maxScroll, so allow a 1px slop at both ends.
        setCanScrollLeft(track.scrollLeft > 1)
        setCanScrollRight(track.scrollLeft < maxScroll - 1)
    }, [])

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        updateArrows()

        track.addEventListener('scroll', updateArrows, { passive: true })

        // Card width and total overflow both change with the viewport, so
        // re-check whenever the track itself is resized.
        const observer = new ResizeObserver(updateArrows)
        observer.observe(track)

        return () => {
            track.removeEventListener('scroll', updateArrows)
            observer.disconnect()
        }
        // Cards changing means the track's overflow changes, so re-measure.
    }, [updateArrows, projects])

    // Scroll by exactly one card, measured off the rendered card so the CSS
    // stays the only place the card width is defined.
    const scrollByCard = (direction) => {
        const track = trackRef.current
        if (!track) return
        const card = track.firstElementChild
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0
        const amount = card ? card.offsetWidth + gap : track.clientWidth
        track.scrollBy({ left: direction * amount, behavior: 'smooth' })
    }

    return (
        <div className={styles["carousel-con"]}>
            <div className={styles["element-carousel"]} ref={trackRef}>
                {projects.map((project, index) => (
                    <a
                        key={project.id ?? index}
                        href={project.href ?? '#'}
                        className={styles["project-element"]}
                    >
                        <div className={styles["project-image"]}>
                            <div className={styles['project-image-wrapper']}>
                                {(project.categories ?? []).map((category) => (
                                    <span key={category}>{category}</span>
                                ))}
                            </div>
                        </div>
                        <div className={styles["project-content-con"]}>
                            <div className={styles["project-title-con"]}>
                                <p>{project.title}</p>
                                <p>{project.type}</p>
                            </div>
                            <div className={styles["project-content"]}>
                                <div>
                                    <p className={styles["project-subtitle"]}>{project.subtitle}</p>
                                    <p className={styles["project-details"]}>{project.details}</p>
                                </div>
                                <div className={styles["project-cta-con"]}>
                                    <p>{project.cta ?? 'View Project'}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className={styles["carousel-nav-con"]}>
                <button
                    type='button'
                    className={styles["carousel-arrow"]}
                    aria-label='Previous project'
                    disabled={!canScrollLeft}
                    onClick={() => scrollByCard(-1)}
                >
                    <span aria-hidden='true'>&#8592;</span>
                </button>
                <button
                    type='button'
                    className={styles["carousel-arrow"]}
                    aria-label='Next project'
                    disabled={!canScrollRight}
                    onClick={() => scrollByCard(1)}
                >
                    <span aria-hidden='true'>&#8594;</span>
                </button>
            </div>
        </div>
    )
}
