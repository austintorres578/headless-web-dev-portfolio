import { useState, useEffect } from 'react'
import ProjectCard from '../ui/ProjectCard'

import styles from './AllProjectsCon.module.css'

const PROJECTS = [
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 1',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 2',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 3',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 4',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 5',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 6',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 7',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 8',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 9',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 10',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 11',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 12',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 13',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 14',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 15',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 16',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 17',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 18',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 19',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 20',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 21',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 22',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 23',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 24',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 25',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 26',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 27',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 28',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 29',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 30',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Gemini API', 'Firebase'],
        meta: 'Tool',
        title: 'Game Database 31',
        description: 'Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'SEO'],
        meta: 'Nonprofit',
        title: 'Community Food Bank of NJ 32',
        description: 'A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Stripe'],
        meta: 'E-commerce',
        title: 'Soylent Clone 33',
        description: 'Pixel-perfect replica with full Stripe payment integration and secured backend key handling.',
    },
    {
        href: '#',
        featured: false,
        tags: ['WordPress', 'WooCommerce'],
        meta: 'E-commerce',
        title: 'Roastery Storefront 34',
        description: 'A subscription-friendly coffee shop with tiered pricing, bundle logic, and a checkout tuned for repeat orders.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Chart.js'],
        meta: 'Tool',
        title: 'Freelance Rate Calculator 35',
        description: 'Turns target income, expenses, and billable hours into an hourly rate, with live charts for each scenario.',
    },
    {
        href: '#',
        featured: false,
        tags: ['React', 'Headless CMS'],
        meta: 'Editorial',
        title: 'Longform Magazine 36',
        description: 'A headless publishing front end with scheduled drops, author pages, and editor previews before anything goes live.',
    },
]

// Cards shown per page. Change this one number to change the grid cap —
// everything else (page count, pagination buttons, prev/next disabled
// state) derives from it automatically.
const PAGE_SIZE = 12;

// Each filter's `match` function decides whether a project belongs in
// that filter. "React" / "Wordpress" check the tags array (a project can
// have both and would show under either). "E-commerce" / "Tools" check
// the `meta` field instead, since that's where those categories actually
// live in this data. "All" always matches.
const FILTERS = [
    { id: 'all', label: 'All', match: () => true },
    { id: 'react', label: 'React', match: (project) => project.tags.includes('React') },
    { id: 'wordpress', label: 'Wordpress', match: (project) => project.tags.includes('WordPress') },
    { id: 'ecommerce', label: 'E-commerce', match: (project) => project.meta === 'E-commerce' },
    { id: 'tools', label: 'Tools', match: (project) => project.meta === 'Tool' },
]

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

    // Temporary debug step: confirm the WP REST endpoint responds and see
    // the shape of what it returns. Logs only — no state, no rendering.
    useEffect(() => {
        fetch('https://cms.austinwebworks.dev/wp-json/wp/v2/project')
            .then((response) => response.json())
            .then((data) => console.log('WP projects:', data))
            .catch((error) => console.error('WP fetch failed:', error))
    }, [])

    const activeFilter = FILTERS.find((filter) => filter.id === activeFilterId)
    const filteredProjects = PROJECTS.filter(activeFilter.match)

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
                    {FILTERS.map((filter) => (
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
                    {visibleProjects.length > 0 ? (
                        visibleProjects.map(project => <ProjectCard key={project.title} {...project} />)
                    ) : (
                        <p className={styles['empty-state']}>No projects match this filter yet.</p>
                    )}
                </div>

                {totalPages > 1 && (
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