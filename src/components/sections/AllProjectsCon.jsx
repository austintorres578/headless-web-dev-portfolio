import { useState, useEffect, useRef } from "react";
import ProjectCard from "../ui/ProjectCard";

import styles from "./AllProjectsCon.module.css";

const WP_API_URL = "https://cms.austinwebworks.dev/wp-json/wp/v2";

// Cards shown per page. Change this one number to change the grid cap —
// everything else (page count, pagination buttons, prev/next disabled
// state) derives from it automatically.
const PAGE_SIZE = 12;

// WordPress returns entities like "&amp;" and "&#8217;" in rendered
// titles and term names, so decode them before displaying.
function decodeHtml(str) {
  if (!str) return "";
  return new DOMParser().parseFromString(str, "text/html").documentElement
    .textContent;
}

// Builds the list of page buttons to render, collapsing long runs into
// an ellipsis (e.g. 1 2 3 ... 8) instead of listing every page number.
function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  const showEllipsisAfter = 3;

  for (let page = 1; page <= totalPages; page++) {
    const isFirstFew = page <= showEllipsisAfter;
    const isLast = page === totalPages;
    const isNearCurrent = Math.abs(page - currentPage) <= 1;

    if (isFirstFew || isLast || isNearCurrent) {
      pages.push(page);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return pages;
}

function rowNeedsExpand(wrapperEl) {
  if (!wrapperEl) return false;
  const pillsEl = wrapperEl.querySelector(
    `.${styles.collapsed}, .${styles.expanded}`,
  );
  if (!pillsEl) return false;

  const buttons = Array.from(pillsEl.children).filter(
    (child) => child.tagName === "BUTTON",
  );
  const GAP = 15; // matches the row's CSS `gap: 15px`
  const contentWidth =
    buttons.reduce((sum, btn) => sum + btn.offsetWidth, 0) +
    GAP * Math.max(buttons.length - 1, 0);

  return contentWidth > wrapperEl.clientWidth;
}

export default function AllProjectsCon() {
  const [activeFilterIds, setActiveFilterIds] = useState([]);
  const [activeTagIds, setActiveTagIds] = useState([]);
  const [activeWorkIds, setActiveWorkIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({
    categories: false,
    tech: false,
    work: false,
  });
  const [expandedRows, setExpandedRows] = useState({
    categories: false,
    tech: false,
    work: false,
  });


  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchJson = (path) =>
      fetch(`${WP_API_URL}${path}`).then((response) => {
        if (!response.ok)
          throw new Error(
            `Request to ${path} failed with status ${response.status}`,
          );
        return response.json();
      });

    Promise.all([
      fetchJson("/project?per_page=100&_embed"),
      fetchJson("/tags?per_page=100"),
      fetchJson("/categories?per_page=100"),
    ])
      .then(([posts, tagTerms, categoryTerms]) => {
        if (cancelled) return;

        const tagNames = new Map(tagTerms.map((term) => [term.id, term.name]));
        const categoryNames = new Map(
          categoryTerms.map((term) => [term.id, term.name]),
        );

        const normalized = posts.map((post) => {
          const acf = post.acf || {};
          const tags = Array.isArray(acf.tags)
            ? acf.tags
              .filter((id) => tagNames.has(id))
              .map((id) => decodeHtml(tagNames.get(id)))
            : [];
          const meta =
            Array.isArray(acf.categorymeta) && acf.categorymeta.length > 0
              ? decodeHtml(categoryNames.get(acf.categorymeta[0]))
              : "";
          const order = parseInt(acf.display_order, 10);

          // Resolve featured image in priority order:
          //  1. WP featured media medium_large size (via _embed)
          //  2. WP featured media full source_url (via _embed)
          //  3. ACF gallery — only if it is a real URL (starts with
          //     http:// or https://) or an object with a .url string
          //  4. '' — no image; card shows the CSS placeholder logo
          const embeddedMedia = post?._embedded?.["wp:featuredmedia"]?.[0];
          const galleryField = acf.gallery;
          const galleryUrl =
            typeof galleryField === "string" &&
              /^https?:\/\//.test(galleryField)
              ? galleryField
              : galleryField &&
                typeof galleryField === "object" &&
                galleryField.url
                ? galleryField.url
                : "";
          const featuredImage =
            embeddedMedia?.media_details?.sizes?.medium_large?.source_url ||
            embeddedMedia?.source_url ||
            galleryUrl ||
            "";

          return {
            id: post.id,
            href: `/projects/${post.slug}`,
            // Always false here: `featured` drives the homepage
            // bento grid, and this page is a uniform grid.
            featured: false,
            tags,
            meta,
            work: acf.work || "",
            title: decodeHtml(post.title?.rendered),
            description: acf.subtitletag_line || "",
            featuredImage,
            // Blank display_order parses to NaN; sort those last.
            order: Number.isNaN(order) ? Infinity : order,
          };
        });

        normalized.sort((a, b) => {
          if (a.order === b.order) return a.title.localeCompare(b.title);
          return a.order < b.order ? -1 : 1;
        });

        setProjects(normalized);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to load projects from WordPress:", err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // TEMPORARY debug: logs the raw project response. Remove when done.
  useEffect(() => {
    let cancelled = false;

    fetch(`${WP_API_URL}/project?per_page=100&_embed`)
      .then((response) => {
        if (!response.ok)
          throw new Error(
            `Debug project fetch failed with status ${response.status}`,
          );
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        console.log("All projects:", data);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Debug project fetch failed:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Pills come from the categories actually used by projects, so unused
  // WordPress categories never show up as empty filters.
  const filters = [
    { id: "all", label: "All" },
    ...[...new Set(projects.map((project) => project.meta).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: name, label: name })),
  ];

  // Same idea for tech pills: only tags actually attached to a project
  // become filters.
  const tagFilters = [
    { id: "all", label: "All" },
    ...[...new Set(projects.flatMap((project) => project.tags))]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: name, label: name })),
  ];

  const workFilters = [
    { id: "all", label: "All" },
    ...[...new Set(projects.map((project) => project.work).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ id: name, label: name })),
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeFilterIds.length === 0 ||
      activeFilterIds.includes(project.meta);
    const matchesTag =
      activeTagIds.length === 0 ||
      project.tags.some((tag) => activeTagIds.includes(tag));
    const matchesWork =
      activeWorkIds.length === 0 ||
      activeWorkIds.includes(project.work);
    return matchesCategory && matchesTag && matchesWork;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleProjects = filteredProjects.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  function handleFilterClick(filterId) {
    if (filterId === "all") {
      setActiveFilterIds([]);
    } else {
      setActiveFilterIds((prev) =>
        prev.includes(filterId)
          ? prev.filter((id) => id !== filterId)
          : [...prev, filterId]
      );
    }
    setCurrentPage(1);
  }

  function handleTagClick(tagId) {
    if (tagId === "all") {
      setActiveTagIds([]);
    } else {
      setActiveTagIds((prev) =>
        prev.includes(tagId)
          ? prev.filter((id) => id !== tagId)
          : [...prev, tagId]
      );
    }
    setCurrentPage(1);
  }

  function handleWorkClick(workId) {
    if (workId === "all") {
      setActiveWorkIds([]);
    } else {
      setActiveWorkIds((prev) =>
        prev.includes(workId)
          ? prev.filter((id) => id !== workId)
          : [...prev, workId]
      );
    }
    setCurrentPage(1);
  }

  function toggleGroup(groupName) {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  }

  function toggleRow(rowName) {
    setExpandedRows((prev) => ({ ...prev, [rowName]: !prev[rowName] }));
  }

  const categoriesWrapperRef = useRef(null);
  const techWrapperRef = useRef(null);
  const workWrapperRef = useRef(null);

  const [rowOverflows, setRowOverflows] = useState({
    categories: false,
    tech: false,
    work: false,
  });

  useEffect(() => {
    function measureRows() {
      setRowOverflows({
        categories: rowNeedsExpand(categoriesWrapperRef.current),
        tech: rowNeedsExpand(techWrapperRef.current),
        work: rowNeedsExpand(workWrapperRef.current),
      });
    }

    measureRows();
    window.addEventListener("resize", measureRows);
    return () => window.removeEventListener("resize", measureRows);
  }, [projects]);

  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    document
      .getElementById("projects-grid-top")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className={styles["all-projects-con"]}>
      <div className={styles["project-filter-pills"]}>
        <div className={styles["project-filter-pills-wrapper"]}>
          <div className={styles["categories"]} ref={categoriesWrapperRef}>
            <span>Categories</span>
            <div
              className={expandedRows.categories ? styles["expanded"] : styles["collapsed"]}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={
                    (filter.id === "all"
                      ? activeFilterIds.length === 0
                      : activeFilterIds.includes(filter.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleFilterClick(filter.id)}
                  aria-pressed={
                    filter.id === "all"
                      ? activeFilterIds.length === 0
                      : activeFilterIds.includes(filter.id)
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
            {rowOverflows.categories && (
              <button
                className={styles["show-button"]}
                onClick={() => toggleRow("categories")}
                aria-expanded={expandedRows.categories}
              >
                {expandedRows.categories ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div className={styles["tech"]} ref={techWrapperRef}>
            <span>Tech</span>
            <div
              className={expandedRows.tech ? styles["expanded"] : styles["collapsed"]}
            >
              {tagFilters.map((tag) => (
                <button
                  key={tag.id}
                  className={
                    (tag.id === "all"
                      ? activeTagIds.length === 0
                      : activeTagIds.includes(tag.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleTagClick(tag.id)}
                  aria-pressed={
                    tag.id === "all"
                      ? activeTagIds.length === 0
                      : activeTagIds.includes(tag.id)
                  }
                >
                  {tag.label}
                </button>
              ))}
            </div>
            {rowOverflows.tech && (
              <button
                className={styles["show-button"]}
                onClick={() => toggleRow("tech")}
                aria-expanded={expandedRows.tech}
              >
                {expandedRows.tech ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <div className={styles["work"]} ref={workWrapperRef}>
            <span>Work</span>
            <div
              className={expandedRows.work ? styles["expanded"] : styles["collapsed"]}
            >
              {workFilters.map((work) => (
                <button
                  key={work.id}
                  className={
                    (work.id === "all"
                      ? activeWorkIds.length === 0
                      : activeWorkIds.includes(work.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleWorkClick(work.id)}
                  aria-pressed={
                    work.id === "all"
                      ? activeWorkIds.length === 0
                      : activeWorkIds.includes(work.id)
                  }
                >
                  {work.label}
                </button>
              ))}
            </div>
            {rowOverflows.work && (
              <button
                className={styles["show-button"]}
                onClick={() => toggleRow("work")}
                aria-expanded={expandedRows.work}
              >
                {expandedRows.work ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>
        <div className={styles["mobile-filter-trigger-con"]}>
          <div className={styles["mobile-filter-trigger-wrapper"]}>
            <div className={styles["mobile-filters-top"]}>
              <button onClick={() => setIsMobileFilterOpen(true)}><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"></path><circle cx="16" cy="6" r="2"></circle><circle cx="10" cy="12" r="2"></circle><circle cx="18" cy="18" r="2"></circle>
              </svg> Filters</button>
              <p>{filteredProjects.length} Project{filteredProjects.length === 1 ? "" : "s"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["section-wrapper"]}>
        <div id="projects-grid-top" className={styles["projects-con"]}>
          {isLoading ? (
            <div
              className={styles["projects-loading-con"]}
              role="status"
              aria-live="polite"
              aria-label="Loading projects"
            >
              <div className={styles["projects-loading-window"]}>
                <div className={styles["loading-titlebar"]}>
                  <span className={`${styles["loading-dot"]} ${styles["red"]}`}></span>
                  <span className={`${styles["loading-dot"]} ${styles["yellow"]}`}></span>
                  <span className={`${styles["loading-dot"]} ${styles["green"]}`}></span>
                  <span className={styles["loading-titlebar-label"]}>austin@portfolio — fetch</span>
                </div>
                <div className={styles["loading-bar-wrap"]}>
                  <div className={styles["loading-bar"]}></div>
                  <div className={styles["loading-caption"]}>
                    Loading projects<span className={styles["loading-cursor"]}></span>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <p className={styles["empty-state"]}>
              Couldn't load projects right now. Please try again later.
            </p>
          ) : visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))
          ) : (
            <p className={styles["empty-state"]}>
              No projects match this filter yet.
            </p>
          )}
        </div>

        {!isLoading && !error && totalPages > 1 && (
          <div className={styles["project-pagination"]}>
            <button
              className={currentPage === 1 ? styles["unclickable"] : ""}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ←
            </button>

            <div className={styles["pagination-buttons"]}>
              {pageNumbers.map((page, index) =>
                page === "ellipsis" ? (
                  <p
                    key={`ellipsis-${index}`}
                    className={styles["page-ellipsis"]}
                  >
                    ···
                  </p>
                ) : (
                  <p
                    key={page}
                    className={[
                      page === currentPage ? styles["active"] : "",
                      page === totalPages ? styles["last-page"] : "",
                    ]
                      .join(" ")
                      .trim()}
                    onClick={() => goToPage(page)}
                    role="button"
                    tabIndex={0}
                    aria-current={page === currentPage ? "page" : undefined}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") goToPage(page);
                    }}
                  >
                    {page}
                  </p>
                ),
              )}
            </div>

            <button
              className={
                currentPage === totalPages ? styles["unclickable"] : ""
              }
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
      <div
        className={`${styles["hidden-mobile-filter-con"]} ${
          isMobileFilterOpen ? "" : styles["invisible"]
        }`}
      >
        <div className={styles["hidden-mobile-filter"]}>
          <div className={styles["hidden-mobile-top"]}>
            <p><strong>Filters</strong></p>
            <button onClick={() => setIsMobileFilterOpen(false)}>✕</button>
          </div>
          <div className={styles["filter-pills-con"]}>
            <div className={styles["filter-pills-trigger"]}>
              <p>Categories</p>
              <button
                onClick={() => toggleGroup("categories")}
                aria-expanded={openGroups.categories}
                style={{
                  transform: openGroups.categories ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ⌵
              </button>
            </div>
            <div
              className={`${styles["filter-pills"]} ${
                openGroups.categories ? "" : styles["invisible"]
              }`}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={
                    (filter.id === "all"
                      ? activeFilterIds.length === 0
                      : activeFilterIds.includes(filter.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleFilterClick(filter.id)}
                  aria-pressed={
                    filter.id === "all"
                      ? activeFilterIds.length === 0
                      : activeFilterIds.includes(filter.id)
                  }
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles["filter-pills-con"]}>
            <div className={styles["filter-pills-trigger"]}>
              <p>Tech</p>
              <button
                onClick={() => toggleGroup("tech")}
                aria-expanded={openGroups.tech}
                style={{
                  transform: openGroups.tech ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ⌵
              </button>
            </div>
            <div
              className={`${styles["filter-pills"]} ${
                openGroups.tech ? "" : styles["invisible"]
              }`}
            >
              {tagFilters.map((tag) => (
                <button
                  key={tag.id}
                  className={
                    (tag.id === "all"
                      ? activeTagIds.length === 0
                      : activeTagIds.includes(tag.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleTagClick(tag.id)}
                  aria-pressed={
                    tag.id === "all"
                      ? activeTagIds.length === 0
                      : activeTagIds.includes(tag.id)
                  }
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles["filter-pills-con"]}>
            <div className={styles["filter-pills-trigger"]}>
              <p>Work</p>
              <button
                onClick={() => toggleGroup("work")}
                aria-expanded={openGroups.work}
                style={{
                  transform: openGroups.work ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ⌵
              </button>
            </div>
            <div
              className={`${styles["filter-pills"]} ${
                openGroups.work ? "" : styles["invisible"]
              }`}
            >
              {workFilters.map((work) => (
                <button
                  key={work.id}
                  className={
                    (work.id === "all"
                      ? activeWorkIds.length === 0
                      : activeWorkIds.includes(work.id))
                      ? styles["active"]
                      : ""
                  }
                  onClick={() => handleWorkClick(work.id)}
                  aria-pressed={
                    work.id === "all"
                      ? activeWorkIds.length === 0
                      : activeWorkIds.includes(work.id)
                  }
                >
                  {work.label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles["hidden-mobile-bottom"]}>
            <button onClick={() => {
              setActiveFilterIds([]);
              setActiveTagIds([]);
              setActiveWorkIds([]);
              setCurrentPage(1);
            }}>Clear All</button>
            <button onClick={() => setIsMobileFilterOpen(false)}>
              Show {filteredProjects.length} Project{filteredProjects.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
