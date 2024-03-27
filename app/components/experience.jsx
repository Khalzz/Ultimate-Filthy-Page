'use client'

import Image from "next/image";
import styles from "../page.module.css";
import { useState } from "react";

import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ['200','400', '700']
})


const ExperienceButton = (props) => {
  const main_div_class = roboto_mono.className + " " + styles.exp_background
  
  return (
    <div className={main_div_class}>
        <p className={styles.exp_title}>{props.positionName} <b className={styles.company}>{props.company}</b></p>
        <p className={styles.project_paragraph_exp}>{props.paragraph}</p>
        <p className={styles.exp_paragraph_bold}>from {props.start} to {props.end}</p>
    </div>
  );
}

export default ExperienceButton