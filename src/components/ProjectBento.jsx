import styles from './ProjectBento.module.css'

export default function ProjectBento() {
    return (

        <div className={styles['bento-grid']}>
            <a href="#" className={`${styles['project-card']} ${styles['featured']}`}>
                <div className={styles['project-image']}><span>React</span><span>Gemini API</span><span>Firebase</span></div>
                <div className={styles['project-content']}>
                    <p className={styles['meta']}>Tool · Featured</p>
                    <h3 className={styles['title']}>Game Database</h3>
                    <p className={styles['description']}>Uses Gemini to auto-import a game collection from a photo, cross-checking results against a live game database to catch errors before they happen.</p>
                    <div className={styles['cta']}>View Project →</div>
                </div>
            </a>

            <a href="#" className={styles['project-card']}>
                <div className={styles['project-image']}><span>WordPress</span><span>SEO</span></div>
                <div className={styles['project-content']}>
                    <p className={styles['meta']}>Nonprofit</p>
                    <h3 className={styles['title']}>Community Food Bank of NJ</h3>
                    <p className={styles['description']}>A Food Finder that returns nearby pickup sites, wrapped in a mobile-first, SEO-structured site.</p>
                    <div className={styles['cta']}>View Project →</div>
                </div>
            </a>

            <a href="#" className={styles['project-card']}>
                <div className={styles['project-image']}><span>React</span><span>Stripe</span></div>
                <div className={styles['project-content']}>
                    <p className={styles['meta']}>E-commerce</p>
                    <h3 className={styles['title']}>Soylent Clone</h3>
                    <p className={styles['description']}>Pixel-perfect replica with full Stripe payment integration and secured backend key handling.</p>
                    <div className={styles['cta']}>View Project →</div>
                </div>
            </a>
        </div>
    )
}
