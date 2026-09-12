import SectionHeader from '../ui/SectionHeader.jsx'

import styles from './ContactSection.module.css'

export default function ContactSection() {
    return (
        <section className={styles["contact-section"]}>
            <div className={styles["section-wrapper"]}>
                <SectionHeader
                    className={styles['generic-section-header']}
                    eyebrowClassName={styles['eyebrow']}
                    eyebrow="What can I do for you"
                    title="Services built around what your business needs"
                    description="Whether you need a brand-new site, more customers finding you online, or something more custom- here's how I can help."
                />
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