import { useState, useEffect } from 'react'
import ProjectCard from '../ui/ProjectCard'

import styles from './AllProjectsCon.module.css'

const WP_API_URL = 'https://cms.austinwebworks.dev/wp-json/wp/v2'

// Cards shown per page. Change this one number to change the grid cap —
// everything else (page count, pagination buttons, prev/next disabled
// state) derives from it automatically.
const PAGE_SIZE = 12;

// WordPress returns entities like "&amp;" and "&#8217;" in rendered
// titles and term names, so decode them before displaying.
function decodeHtml(str) {
    if (!str) return ''
    return new DOMParser().parseFromString(str, 'text/html').documentElement.textContent
}

// Builds the list of page buttons to render, collapsing long runs into
// an ellipsis (e.g. 1 2 3 ... 8) instead of listing every page number.
function getPageNumbers(currentPage, totalPages) {
    const pages = []
    const showEllipsisAfter = 3

    for (let page = 1; page <= totalPages; page++) {
        const isFirstFew = page <= showEllipsisAfter
        const isLast = page === totalPages
        const isNearCurrent = Math.abs(page - currentPage) <= 1

        if (isFirstFew || isLast || isNearCurrent) {
            pages.push(page)
        } else if (pages[pages.length - 1] !== 'ellipsis') {
            pages.push('ellipsis')
        }
    }

    return pages
}

export default function AllProjectsCon() {
    const [activeFilterId, setActiveFilterId] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)

    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false

        const fetchJson = (path) =>
            fetch(`${WP_API_URL}${path}`).then((response) => {
                if (!response.ok) throw new Error(`Request to ${path} failed with status ${response.status}`)
                return response.json()
            })

        Promise.all([
            fetchJson('/project?per_page=100'),
            fetchJson('/tags?per_page=100'),
            fetchJson('/categories?per_page=100'),
        ])
            .then(([posts, tagTerms, categoryTerms]) => {
                if (cancelled) return

                const tagNames = new Map(tagTerms.map((term) => [term.id, term.name]))
                const categoryNames = new Map(categoryTerms.map((term) => [term.id, term.name]))

                const normalized = posts.map((post) => {
                    const acf = post.acf || {}
                    const tags = Array.isArray(acf.tags)
                        ? acf.tags.filter((id) => tagNames.has(id)).map((id) => decodeHtml(tagNames.get(id)))
                        : []
                    const meta = Array.isArray(acf.categorymeta) && acf.categorymeta.length > 0
                        ? decodeHtml(categoryNames.get(acf.categorymeta[0]))
                        : ''
                    const order = parseInt(acf.display_order, 10)

                    return {
                        id: post.id,
                        href: `/projects/${post.slug}`,
                        // Always false here: `featured` drives the homepage
                        // bento grid, and this page is a uniform grid.
                        featured: false,
                        tags,
                        meta,
                        title: decodeHtml(post.title?.rendered),
                        description: acf.subtitletag_line || '',
                        // Blank display_order parses to NaN; sort those last.
                        order: Number.isNaN(order) ? Infinity : order,
                    }
                })

                normalized.sort((a, b) => {
                    if (a.order === b.order) return a.title.localeCompare(b.title)
                    return a.order < b.order ? -1 : 1
                })

                setProjects(normalized)
            })
            .catch((err) => {
                if (cancelled) return
                console.error('Failed to load projects from WordPress:', err)
                setError(err)
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [])

    // Pills come from the categories actually used by projects, so unused
    // WordPress categories never show up as empty filters.
    const filters = [
        { id: 'all', label: 'All' },
        ...[...new Set(projects.map((project) => project.meta).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b))
            .map((name) => ({ id: name, label: name })),
    ]

    const filteredProjects = activeFilterId === 'all'
        ? projects
        : projects.filter((project) => project.meta === activeFilterId)

    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PAGE_SIZE))
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const visibleProjects = filteredProjects.slice(startIndex, startIndex + PAGE_SIZE)
    const pageNumbers = getPageNumbers(currentPage, totalPages)

    function handleFilterClick(filterId) {
        if (filterId === activeFilterId) return
        setActiveFilterId(filterId)
        // Changing the filter changes what page 1 even means, so always
        // snap back to page 1 rather than leaving currentPage pointed at
        // a page that may no longer exist under the new filter.
        setCurrentPage(1)
    }

    function goToPage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return
        setCurrentPage(page)
        document.getElementById('projects-grid-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section className={styles["all-projects-con"]}>
            <div className={styles["project-filter-pills"]}>
                <div className={styles['project-filter-pills-wrapper']}>
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            className={filter.id === activeFilterId ? styles['active'] : ''}
                            onClick={() => handleFilterClick(filter.id)}
                            aria-pressed={filter.id === activeFilterId}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles["section-wrapper"]}>
                <div id="projects-grid-top" className={styles["projects-con"]}>
                    {isLoading ? (
                        <p className={styles['empty-state']}>Loading projects…</p>
                    ) : error ? (
                        <p className={styles['empty-state']}>Couldn't load projects right now. Please try again later.</p>
                    ) : visibleProjects.length > 0 ? (
                        visibleProjects.map(project => <ProjectCard key={project.id} {...project} />)
                    ) : (
                        <p className={styles['empty-state']}>No projects match this filter yet.</p>
                    )}
                </div>

                {!isLoading && !error && totalPages > 1 && (
                    <div className={styles["project-pagination"]}>
                        <button
                            className={currentPage === 1 ? styles['unclickable'] : ''}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            ←
                        </button>

                        <div className={styles['pagination-buttons']}>
                            {pageNumbers.map((page, index) =>
                                page === 'ellipsis' ? (
                                    <p key={`ellipsis-${index}`} className={styles['page-ellipsis']}>···</p>
                                ) : (
                                    <p
                                        key={page}
                                        className={[
                                            page === currentPage ? styles['active'] : '',
                                            page === totalPages ? styles['last-page'] : '',
                                        ].join(' ').trim()}
                                        onClick={() => goToPage(page)}
                                        role="button"
                                        tabIndex={0}
                                        aria-current={page === currentPage ? 'page' : undefined}
                                        onKeyDown={(e) => { if (e.key === 'Enter') goToPage(page) }}
                                    >
                                        {page}
                                    </p>
                                )
                            )}
                        </div>

                        <button
                            className={currentPage === totalPages ? styles['unclickable'] : ''}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}