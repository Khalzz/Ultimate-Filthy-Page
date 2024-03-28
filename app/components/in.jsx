'use client'
import { useState } from "react";
import { useEffect } from "react";
import styles from "../page.module.css";

const InTransition = (props) => {

  let names = ["Full-stack Developer", "Game Developer", "Ui Designer"];
  let [margin, setMargin] = useState('')
  let [scale, setScale] = useState(1.3)

  useEffect(() => {
    let scaleTimer = setTimeout(() => setScale(1), 100);
    let timer = setTimeout(() => setMargin('100vw'), 400);
    return () => {
        clearTimeout(timer)
        clearTimeout(scaleTimer)
    };
  }, []); 

  return (
    <>
        <div className={styles.transition} style={{marginLeft: margin}}>
            <h1 className={styles.title} style={{scale: scale}}>Rodrigo Seguel</h1>
            <h2 className={styles.subtitle_transition} style={{scale: scale}}>Developer</h2>
        </div>
    </>
  );
}

export default InTransition