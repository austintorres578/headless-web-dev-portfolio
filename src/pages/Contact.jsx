import {Link} from 'react-router-dom'

import styles from './Contact.module.css'

export default function Contact() {
    return (
        <>
            <section className={styles["contact-hero"]}>
                <div className={styles["section-wrapper"]}>
                    <Link to="/" className={styles["back-home"]}>Back to home</Link>
                    <span className={styles["eyebrow"]}>GET IN TOUCH</span>
                    <h1>Let's talk about an opportunity</h1>
                    <p>Open to front-end and React roles — reach out and I'll get back to you quickly.</p>
                    <span>Currently employed, open to new roles</span>
                </div>
            </section>
            <section className={styles['contact-section']}>
                <div className={styles['section-wrapper']}>
                    <div className={styles["contact-details"]}>
                        <span>Direct</span>
                        <a className={styles['email']} href="mailto:austintorres578@outlook.com">austintorres578@outlook.com</a>
                        <a className={styles["phone"]} href="tel:9088758077">(908) 875-8077</a>
                        <span>Elsewhere</span>
                        <a className={styles['linkedin']} href="#">LinkedIn</a>
                        <a href='#' className={styles['github']}>GitHub</a>
                        <a href="#" className={styles['resume']}>Download Resume</a>
                        <div className={styles['details-sub']}>
                            <p>I typically respond within 1–2 business days. For time-sensitive opportunities, email is fastest.</p>
                        </div>
                    </div>

                    <div className={styles['contact-form-con']}>
                        <form>
                            <div>
                                <label>
                                    Name
                                    <input type='text' placeholder='John Doe'></input>
                                </label>
                                <label>
                                    Email
                                    <input type='email' placeholder='johndoe@company.com'></input>
                                </label>
                                <label>
                                    Company (optional)
                                    <input type='text' placeholder="Company Inc."></input>
                                </label>
                                <label>
                                    Role you're hiring for (optional)
                                    <input type='text' placeholder='Full-Stack Developer'></input>
                                </label>
                            </div>
                            <label>
                                Message
                                <textarea placeholder='Tell me a bit about the role or opportunity...'>

                                </textarea>
                            </label>
                            <button>Send A Message</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}