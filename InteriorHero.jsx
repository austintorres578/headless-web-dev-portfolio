import { Link } from "react-router-dom"

import styles from './InteriorHero.module.css'

export default function InteriorHero(){
    return(
        <section className={styles["interior-hero"]}>
            <div className={styles["section-wrapper"]}>
                <Link to="/" className={styles["back-home"]}>Back to home</Link>
                <span className={styles["eyebrow"]}>All Projects</span>
                <h1>Everything I've built</h1>
                <p>A complete list of client work, tools, and side projects — filter by what you're looking for.</p>
            </div>
        </section>
    )
}