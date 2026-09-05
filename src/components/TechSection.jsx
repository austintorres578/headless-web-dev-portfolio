import TerminalWindow from './TerminalWindow'

import styles from './TechSection.module.css'

const TERMINAL_LINES = [
    { command: 'ls languages/', output: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
    { command: 'ls frameworks/', output: ['React', 'Node.js', 'Express'] },
    { command: 'ls cms/', output: ['WordPress'] },
    {
        command: 'ls tools/',
        output: ['Git', 'Firebase', 'OpenAI API', 'Google Cloud Vision', 'Stripe API', 'RAWG API'],
    },
]

export default function AboutSection() {
    return (
        <section className={styles['tech-section']}>
            <div className={styles['section-wrapper']}>
                <div>
                    <div className={styles['generic-section-header']}>
                        <span className={styles['eyebrow']}>TECH & TOOLS</span>
                        <h2>The tools behind my work</h2>
                    </div>
                    <div className='copy-section'>
                        <p>I'm a front-end developer with 3+ years of paid experience shipping production WordPress sites, now focused on React and TypeScript. My strongest work combines full-stack engineering with practical AI integration, like a game library tool that uses Gemini to auto-import a user's collection from a photo, cross-checked against a live game database to catch errors before they happen.</p>
                    </div>
                </div>
                <div>
                    <TerminalWindow lines={TERMINAL_LINES} />
                </div>

            </div>
        </section>
    )
}