'use client'
import { useState } from "react";
import { useEffect } from "react";


const Subtitle = (props) => {
  /*
    TODO:
      - make some effect so the change is softer
  */


  let names = ["Full-stack Developer", "Game Developer", "Ui Designer"];
  let [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % names.length);
    }, 3000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []); 

  return (
    <>
      {names[index]}
    </>
  );
}

export default Subtitle