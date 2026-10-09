import styles from './BadgeTicker.module.css'

// A horizontally scrolling, infinitely looping row of pill badges.
//
// `items` is a list of { label, icon } — `icon` is optional and can be any
// node (an inline <svg>, an <img>, an emoji), so the ticker stays agnostic
// about where the artwork comes from.
//
// `duration` is the time for one full pass of the list, as a CSS time value.
// A longer list needs a longer duration to keep the same apparent speed.
export default function BadgeTicker({ items = [], duration = '24s' }) {
    if (items.length === 0) return null

    // The animation translates the track by -50%, which only lines up if the
    // track is exactly two copies of the list. Duplicating here (rather than
    // asking the caller to pass the list twice) keeps that coupling internal.
    const loop = [...items, ...items]

    return (
        <div className={styles['badge-ticker-viewport']}>
            <div
                className={styles['badge-ticker-track']}
                style={{ '--badge-ticker-duration': duration }}
            >
                {loop.map((item, index) => (
                    // Index is part of the key because the second copy repeats
                    // the same labels; the list is static, so this is stable.
                    <span className={styles['badge']} key={`${item.label}-${index}`}>
                        {item.icon}
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    )
}
