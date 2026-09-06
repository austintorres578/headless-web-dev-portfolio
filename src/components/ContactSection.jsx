import styles from './ContactSection.module.css'

export default function ContactSection() {
    return (
        <section className={styles["contact-section"]}>
            <div className={styles["section-wrapper"]}>
                <div className={styles['generic-section-header']}>
                    <span className={styles['eyebrow']}>What can I do for you</span>
                    <h2>Services built around what your business needs</h2>
                    <p>Whether you need a brand-new site, more customers finding you online, or something more custom- here's how I can help.</p>
                </div>
                <form>
                    <div>
                        <label>Name
                            <input type='text' placeholder='John Doe' />
                        </label>
                        <label>Email
                            <input type="email" name="" id="" placeholder='John@company.com' />
                        </label>
                    </div>
                    <label>Company (optional)
                        <input type="text" placeholder='Company Inc.' />
                    </label>
                    <label>Message
                        <textarea placeholder='Tell me a bit about the role...' />
                    </label>
                    <button className='orange-button'>Submit</button>
                </form>
            </div>
        </section>
    )
}