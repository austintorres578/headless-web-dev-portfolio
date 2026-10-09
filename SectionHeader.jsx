// The eyebrow / heading / blurb block shared by the top of each section.
// The styling stays in each section's own .module.css, so callers pass their
// own hashed class names down — the CSS rules are parent-scoped
// (e.g. `.contact-section .generic-section-header .eyebrow`) and each section
// styles them differently.
export default function SectionHeader({
    className,
    eyebrowClassName,
    eyebrow,
    title,
    description,
}) {
    return (
        <div className={className}>
            <span className={eyebrowClassName}>{eyebrow}</span>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
        </div>
    )
}
