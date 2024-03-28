import styles from "./page.module.css";


export default function Loading() {
    return <>
        <div className={styles.transition}>
            <h1 className={styles.title} style={{scale: 1.3}}>Rodrigo Seguel</h1>
            <h2 className={styles.subtitle_transition} style={{scale: 1.3}}>Developer</h2>
        </div>
    </>;
}