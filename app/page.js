import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import ProjectButton from "./components/project_button"
import Subtitle from "./components/subtitle"
import CustomFooter from "./components/footer"
import ExperienceButton from "./components/experience"
import { Client } from "@notionhq/client";


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
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })

  return (
    <main className={styles.background}>
      <section className={styles.centered_first}>
        <div className={styles.centered_column}>
          <h1 className={styles.title}>Rodrigo Seguel</h1>
          <h2 className={styles.subtitle}><Subtitle/></h2>
        </div>
      </section>
      <section className={styles.centered_title}>
        <h2 className={styles.about_title_desktop}>About me</h2>
        <div className={styles.inner_centered_title}>
          <Image className={styles.logo_about} src="About/Head.svg" width={500} height={500}/>
          <h2 className={styles.about_title_mobile}>About me</h2>

          <div className={styles.pink_bordered}>
            <div>
              <p className={roboto_mono.className}>
                I'm <b className={styles.pink_text}>Rodrigo Seguel</b>, a <b className={styles.pink_text}>Software Developer</b> with a love for both web and game development. Constantly exploring new technologies and pushing myself to learn more.              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.centered_column_first}>
        <div className={styles.projects_title_background}><h2 className={styles.projects_title}>Projects</h2></div>
        <div className={styles.projects_background}>
          {await loadProj(notion)}
        </div>
        <Link href="/projects"><button className={roboto_mono.className + " " + styles.button_more}>More</button></Link>
      </section>
      <section className={styles.centered_column_first}>
      <div className={styles.projects_title_background}><h2 className={styles.projects_title}>Profesional Experience</h2></div>
        <div className={styles.exp_container}>
          <div className={styles.top_exp}>
            {await loadExp(notion)}
          </div>
        </div>
      </section>
      <CustomFooter/>
    </main>
  );
}

const loadExp = async (notion) => { 
  const databaseExp = await notion.databases.query({
    database_id: process.env.DATABASE_EXP_ID,
  })
  
  let experiences = []

  databaseExp.results.forEach((element, index) => {
    try {
      if (index < 3) {
        experiences.push(<ExperienceButton positionName={element.properties.position.title[0].plain_text} company={get_plain(element.properties.company)} paragraph={get_plain(element.properties.description)} start={get_plain(element.properties.from)} end={get_plain(element.properties.to)}/>)
        if (index < databaseExp.results.length - 1) {
          experiences.push(<div className={styles.exp_divisor}></div>)
        } else {
          experiences.push(<div className={styles.exp_start}><div className={styles.exp_start_circ}></div><div className={styles.exp_start_line}></div></div>)
        }
      }
    } catch (error) {
      experiences.push(<>upsi</>)
    }
  })

  return experiences;
}

const loadProj = async (notion) => {
  const databaseProjects = await notion.databases.query({
    database_id: process.env.DATABASE_PROJ_ID,
  })

  let projects = []

  databaseProjects.results.forEach((element, index) => {
    try {
      if (index < 3) {
        let data = {
          id: element.properties.ID.unique_id.number,
          title: element.properties.title.title[0].plain_text,
          paragraph: get_plain(element.properties.description),
          technologies: element.properties.technologies.multi_select,
          gif: get_plain(element.properties.gif)
        }

        projects.push(<ProjectButton data={data}/>)
      }
    } catch (error) {
      projects.push(<>upsi</>)
    }
  })
  return projects;
}

const get_plain = (property) => {
  try {
    return property.rich_text[0].plain_text
  } catch (error) {
    return ""
  }
}