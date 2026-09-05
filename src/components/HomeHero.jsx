import { Link } from 'react-router-dom'

import styles from '../components/HomeHero.module.css'

export default function HomeHero() {
    return (
        <section className={styles["home-hero"]}>
            <div className={styles["section-wrapper"]}>
                <div className={styles["hero-content"]}>
                    <span className={styles["pretext"]}>Freelance Web Developer · NJ</span>
                    <h1>
                        I build fast, <strong>search-optimized</strong> websites that turn
                        visitors into customers.
                    </h1>
                    <p>
                        Pixel-perfect front-end work in React and WordPress, backed by real
                        SEO — so the sites I build don't just look good, they get found and
                        convert.
                    </p>
                    <div className={styles["button-flex"]}>
                        <Link to="/" className={styles["orange-button"]}>See My Work</Link>
                        <Link to="/" className={styles["transparent-button"]}>Start A Project</Link>

                        <a href="/" className={styles["social-circle"]}>
                            <svg viewBox="0 0 24 24">
                                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.5 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z"></path>
                            </svg>
                        </a>
                        <a href="/" className={styles["social-circle"]}>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className={styles["hero-austin"]}>
                    <img src="/images/retro-austin.webp" alt="Austin Torres" />
                </div>
            </div>
        </section>
    )
}