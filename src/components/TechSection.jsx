import { RiOpenaiFill } from 'react-icons/ri'
import {
    SiClaude,
    SiCss,
    SiExpress,
    SiFirebase,
    SiGit,
    SiGooglecloud,
    SiHtml5,
    SiJavascript,
    SiNodedotjs,
    SiReact,
    SiShopify,
    SiStripe,
    SiTypescript,
    SiWordpress,
} from 'react-icons/si'
import { TbDeviceGamepad2 } from 'react-icons/tb'

import BadgeTicker from './BadgeTicker'
import TerminalWindow from './TerminalWindow'

import styles from './TechSection.module.css'

const TERMINAL_LINES = [
    { command: 'ls languages/', output: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
    { command: 'ls frameworks/', output: ['React', 'Node.js', 'ExpressJS'] },
    { command: 'ls cms/', output: ['WordPress','Shopify'] },
    {
        command: 'ls tools/',
        output: ['Git', 'Claude','ChatGPT','Firebase', 'OpenAI API', 'Google Cloud Vision', 'Stripe API', 'RAWG API'],
    },
]

// Mirrors the tech listed in TERMINAL_LINES, in the same order, so the ticker
// and the terminal never drift apart. Colors are each brand's own.
const TECH_BADGES = [
    { label: 'HTML', icon: <SiHtml5 color="#E34F26" aria-hidden="true" /> },
    { label: 'CSS', icon: <SiCss color="#663399" aria-hidden="true" /> },
    { label: 'JavaScript', icon: <SiJavascript color="#F7DF1E" aria-hidden="true" /> },
    { label: 'TypeScript', icon: <SiTypescript color="#3178C6" aria-hidden="true" /> },
    { label: 'React', icon: <SiReact color="#61DAFB" aria-hidden="true" /> },
    { label: 'Node.js', icon: <SiNodedotjs color="#5FA04E" aria-hidden="true" /> },
    { label: 'ExpressJS', icon: <SiExpress color="#000000" aria-hidden="true" /> },
    { label: 'WordPress', icon: <SiWordpress color="#21759B" aria-hidden="true" /> },
    { label: 'Shopify', icon: <SiShopify color="#7AB55C" aria-hidden="true" /> },
    { label: 'Git', icon: <SiGit color="#F05032" aria-hidden="true" /> },
    { label: 'Claude', icon: <SiClaude color="#D97757" aria-hidden="true" /> },
    { label: 'ChatGPT', icon: <RiOpenaiFill color="#10A37F" aria-hidden="true" /> },
    { label: 'Firebase', icon: <SiFirebase color="#FFCA28" aria-hidden="true" /> },
    { label: 'OpenAI API', icon: <RiOpenaiFill color="#412991" aria-hidden="true" /> },
    { label: 'Google Cloud Vision', icon: <SiGooglecloud color="#4285F4" aria-hidden="true" /> },
    { label: 'Stripe API', icon: <SiStripe color="#635BFF" aria-hidden="true" /> },
    // RAWG has no brand icon in react-icons; a gamepad reads as "game database".
    { label: 'RAWG API', icon: <TbDeviceGamepad2 color="#E5E5E5" aria-hidden="true" /> },
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
                    <BadgeTicker items={TECH_BADGES} />
                </div>
                <div>
                    <TerminalWindow lines={TERMINAL_LINES} />
                </div>

            </div>
        </section>
    )
}