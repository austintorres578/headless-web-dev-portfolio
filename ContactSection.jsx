import { useState } from 'react'
import SectionHeader from '../ui/SectionHeader.jsx'

import styles from './ContactSection.module.css'

const WEB3FORMS_ACCESS_KEY = '7eab3768-1a8b-4e80-8264-1bb34328c42b'

export default function ContactSection() {
    const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

    async function handleSubmit(e) {
        e.preventDefault()
        setStatus('submitting')

        const formData = new FormData(e.target)
        formData.append('access_key', WEB3FORMS_ACCESS_KEY)

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            })
            const data = await response.json()
            setStatus(data.success ? 'success' : 'error')
            if (data.success) {
                e.target.reset()
            }
        } catch (err) {
            console.error('Contact form submission failed:', err)
            setStatus('error')
        }
    }

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
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name
                            <input type='text' name='name' placeholder='John Doe' required />
                        </label>
                        <label>Email
                            <input type="email" name="email" placeholder='John@company.com' required />
                        </label>
                    </div>
                    <label>Company (optional)
                        <input type="text" name="company" placeholder='Company Inc.' />
                    </label>
                    <label>Message
                        <textarea name="message" placeholder='Tell me a bit about the role...' required />
                    </label>
                    <button type='submit' className='orange-button' disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending...' : 'Submit'}
                    </button>
                    {status === 'success' && <p role="status" className={styles['status']}>Thanks — I'll get back to you soon.</p>}
                    {status === 'error' && <p role="alert" className={styles['status-bad']}>Something went wrong. Please try again or email me directly.</p>}
                </form>
            </div>
        </section>
    )
}