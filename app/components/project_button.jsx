'use client'

import Image from "next/image";
import styles from "../page.module.css";
import { useState } from "react";

import { Roboto_Mono } from "next/font/google";
import Link from "next/link";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ['200','400', '700']
})


const ProjectButton = (props) => {
  const [hovered, setIsHovered] = useState(false);
  const main_div_class = roboto_mono.className + " " + styles.project_background
  const data = props.data;


  const techs = data.technologies ? loadTechs(data.technologies) : null

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  let texts = [];

  let lines = data.paragraph.split("\n")

  lines.forEach((line, index) => {
    if (index == lines.length - 1) {
      texts.push(<>{line}</>);
    } else {
      texts.push(<>{line}<br/><br/></>);
    }
  });

  return (
    <div key={data.id} className={main_div_class} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ backgroundImage: hovered ? `url('${data.gif}')` : 'none'}}>
        <Link href={`/projects/${encodeURIComponent(data.id)}` + (!props.home ? '?h=1' : '')}>
        <div className={styles.over}>
          <div className={styles.project_title}>{data.title}</div>
          <p className={styles.project_paragraph}>{texts}</p>
          <div className={styles.tech_list}>{techs}</div>
        </div>
      </Link>
    </div>
  );
}

const loadTechs = (techs) => {
  let elements = []

  techs.forEach(element => {
    elements.push(<div className={styles.tech}>{element.name}</div>)
  })

  return elements
}

export default ProjectButton