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
      <div className={styles.centered_column_proj}>
        <Link href={`/`}>
            <Image
            src={"/icons/Back.svg"}
            width={80}
            height={80}
            className={styles.back}
            />
        </Link>
        <div className={styles.exp_title_background}><h2 className={styles.projects_title}>Projects</h2></div>
        <div className={styles.projects_background}>
          {await loadProj()}
        </div>
      </div>
      <CustomFooter/>
    </main>
  );
}

const loadProj = async () => {
  try {
    const notion = new Client({
      auth: process.env.NOTION_KEY
    })

    const databaseProjects = await notion.databases.query({
      database_id: process.env.DATABASE_PROJ_ID,
    })

    let projects = []

    databaseProjects.results.forEach((element, index) => {
      try {
          let data = {
            id: element.properties.ID.unique_id.number,
            title: element.properties.title.title[0].plain_text,
            paragraph: get_plain(element.properties.description),
            technologies: element.properties.technologies.multi_select,
            gif: get_plain(element.properties.gif)
          }

          projects.push(<ProjectButton home={false} data={data}/>)
      } catch (error) {
        projects.push(<>upsi</>)
      }
    });
    return projects;
  } catch (e) {
    return <>
      <p className={roboto_mono.className + ' ' + styles.centered}>
        The projects list did not loaded correctly
      </p>
    </>
  }
}

const get_plain = (property) => {
  try {
    return property.rich_text[0].plain_text
  } catch (error) {
    return ""
  }
}