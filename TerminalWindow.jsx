import styles from './TerminalWindow.module.css'

// Each command's line fades in, then its output follows a beat later.
const COMMAND_DELAY = 0.5
const OUTPUT_OFFSET = 0.2
const FIRST_DELAY = 0.1

export default function TerminalWindow({ label = 'austin@portfolio — zsh', lines = [], showCursor = true }) {
    return (
        <div className={styles['terminal-window']}>
            <div className={styles['terminal-titlebar']}>
                <span className={`${styles['terminal-dot']} ${styles['red']}`}></span>
                <span className={`${styles['terminal-dot']} ${styles['yellow']}`}></span>
                <span className={`${styles['terminal-dot']} ${styles['green']}`}></span>
                <span className={styles['terminal-titlebar-label']}>{label}</span>
            </div>
            <div className={styles['terminal-body']}>
                {lines.map((line, index) => {
                    const commandDelay = FIRST_DELAY + index * COMMAND_DELAY

                    return (
                        <div key={line.command}>
                            <div
                                className={styles['terminal-line']}
                                style={{ animationDelay: `${commandDelay.toFixed(2)}s` }}
                            >
                                <span className={styles['terminal-prompt']}>$</span>
                                <span className={styles['terminal-command']}>{line.command}</span>
                            </div>
                            <div
                                className={styles['terminal-output']}
                                style={{ animationDelay: `${(commandDelay + OUTPUT_OFFSET).toFixed(2)}s` }}
                            >
                                {line.output.map((item) => (
                                    <span key={item}>{item}</span>
                                ))}
                            </div>
                        </div>
                    )
                })}

                {showCursor && (
                    <div
                        className={`${styles['terminal-line']} ${styles['terminal-line-last']}`}
                        style={{ animationDelay: `${(FIRST_DELAY + lines.length * COMMAND_DELAY).toFixed(2)}s` }}
                    >
                        <span className={styles['terminal-prompt']}>$</span>
                        <span className={styles['terminal-cursor']}></span>
                    </div>
                )}
            </div>
        </div>
    )
}
