import styles from "../page.module.css";
import ProjectButton from "../components/project_button"
import CustomFooter from "../components/footer"
import InTransition from "../components/in"
import { Client } from "@notionhq/client";
import Link from "next/link";
import Image from "next/image";

import { Roboto_Mono, Roboto } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ['200','400', '700']
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100','400', '700']
})

export default async function Home() {
  return (
    <main className={styles.background}>
      <InTransition/>
      
      <CustomFooter/>
    </main>
  );
}
