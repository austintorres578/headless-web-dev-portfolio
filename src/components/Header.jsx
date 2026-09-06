import styles from './Header.module.css'

import siteLogo from '../../public/images/site_logo.png'

export default function Header() {
    return (
        <header className={styles['site-header']}>
            <div className={styles['site-header__inner']}>
                <div className={styles['site-branding']}>
                    <a href="/" className={styles['site-logo']} rel="home">
                        <img src="/images/site_logo.png" alt="Austin Torres" />
                    </a>
                </div>

                {/* <button className={styles['nav-toggle']} id="navToggle" aria-controls="primary-menu" aria-expanded="false">
                    <span className={styles['screen-reader-text']}>Menu</span>
                    <span className={styles['nav-toggle__bars']} aria-hidden="true">&#9776;</span>
                </button> */}

                <nav className={styles['main-navigation']} aria-label="Primary">
                    <ul id="primary-menu" className={styles['nav-menu']}>
                        <li><a href="/">Tech</a></li>
                        <li><a href="/">Projects</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a className={styles['orange-button']} href='#'>Resume</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}