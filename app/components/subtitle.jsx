'use client'
import styles from "../page.module.css";
import { useState } from "react";
import { useEffect } from "react";


const Subtitle = (props) => {
  /*
    TODO:
      - make some effect so the change is softer
  */


  let names = ["Full-stack Developer", "Game Developer", "Ui Designer"];
  let [index, setIndex] = useState(0);
  let [color, setColor] = useState("#DC486A");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColor("#dc486b00")
      const intervalChange = setTimeout(() => {
          setIndex(prevIndex => (prevIndex + 1) % names.length);
        setColor("#DC486A")
      }, 500);
      return () => clearTimeout(intervalChange); // Clear interval on component unmount
    }, 3000);
    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []); 

  return (
    <>
      <h2 className={styles.subtitle} style={{color: color}}>{names[index]}</h2>
    </>
  );
}

export default Subtitle