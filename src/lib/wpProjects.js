const WP_API_URL = 'https://cms.austinwebworks.dev/wp-json/wp/v2'

function decodeHtml(str) {
    if (!str) return ''
    return new DOMParser().parseFromString(str, 'text/html').documentElement.textContent
}

const fetchJson = (path) =>
    fetch(`${WP_API_URL}${path}`).then((response) => {
        if (!response.ok) throw new Error(`Request to ${path} failed with status ${response.status}`)
        return response.json()
    })

function load() {
    return Promise.all([
        fetchJson('/project?per_page=100&_embed'),
        fetchJson('/tags?per_page=100'),
        fetchJson('/categories?per_page=100'),
    ]).then(([posts, tagTerms, categoryTerms]) => {
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

            const embeddedMedia = post?._embedded?.['wp:featuredmedia']?.[0]
            const galleryField = acf.gallery
            const galleryUrl =
                typeof galleryField === 'string' && /^https?:\/\//.test(galleryField)
                    ? galleryField
                    : galleryField && typeof galleryField === 'object' && galleryField.url
                        ? galleryField.url
                        : ''
            const featuredImage =
                embeddedMedia?.media_details?.sizes?.medium_large?.source_url ||
                embeddedMedia?.source_url ||
                galleryUrl ||
                ''

            return {
                id: post.id,
                slug: post.slug,
                href: `/projects/${post.slug}`,
                isFeatured: acf.featured === true || acf.featured === 1 || acf.featured === '1',
                tags,
                meta,
                title: decodeHtml(post.title?.rendered),
                description: acf.subtitletag_line || '',
                featuredImage,
                order: Number.isNaN(order) ? Infinity : order,
            }
        })

        normalized.sort((a, b) => {
            if (a.order === b.order) return a.title.localeCompare(b.title)
            return a.order < b.order ? -1 : 1
        })

        return normalized
    })
}

// Module-level cache so repeated calls share one in-flight request.
// This also prevents React StrictMode's double-invoked effect from
// firing two parallel requests in development.
let cachedRequest = null

export function fetchProjects() {
    if (!cachedRequest) {
        cachedRequest = load().catch((error) => {
            cachedRequest = null
            throw error
        })
    }
    return cachedRequest
}
