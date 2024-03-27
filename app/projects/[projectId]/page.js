import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

import { Client } from "@notionhq/client";
import { Roboto_Mono, Roboto } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ['200', '300', '400', '700']
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100','400', '700']
})

async function Project({ params }) {
  const notion = new Client({
    auth: process.env.NOTION_KEY
  })

  const databaseProjects = await notion.databases.query({
    database_id: process.env.DATABASE_PROJ_ID,
  })

  const project = databaseProjects.results.find((element) => {
    return element.properties.ID.unique_id.number == params.projectId;
  });
  
  let description = [];

  let lines = get_plain(project.properties.description).split("\n")

  lines.forEach((line, index) => {
    if (index == lines.length - 1) {
      description.push(<>{line}</>);
    } else {
      description.push(<>{line}<br/><br/></>);
    }
  });

  const techs = project.properties.technologies.multi_select ? loadTechs(project.properties.technologies.multi_select) : null

  return (
    <div className={styles.background}>
      <Link href={`/`}>
        <Image
          src={"/icons/Back.svg"}
          width={80}
          height={80}
          className={styles.back}
        />
      </Link>
      <section className={styles.centered}>
        
        <div className={styles.centered_column}>
          <Link href={get_plain(project.properties.project_link) != '' ? get_plain(project.properties.project_link) : get_plain(project.properties.github_link)} className={styles.proj_link} target="_blank">
            <Image
              alt="The cover image was not loaded"
              src={get_plain(project.properties.cover)}
              width={2394}
              height={970}
              className={styles.proj_img}
            />
          </Link>

          <h3 className={styles.instructions + ' ' + roboto_mono.className}>Press the banner to see the whole project</h3>	
          <h1 className={styles.title}>{project.properties.title.title[0].plain_text}</h1>
          <p className={styles.description  + ' ' + roboto_mono.className}>{description}</p>
          <h3 className={styles.dev_with}>Developed with:</h3>
          <div className={styles.tech_list}>{techs}</div>
          {github_btn(get_plain(project.properties.project_link), get_plain(project.properties.github_link))}
        </div>
      </section>

    </div>
  );
}

const github_btn = (project_link, github_link) => {
  if (project_link != '' && github_link != '') {
    return (<>
      <Link Link href={github_link} target="_blank">
        <div className={styles.github_btn}>
          <p className={roboto_mono.className}>Check it out on GitHub</p>
        </div>
      </Link>
    </>)
  } else {
    <></>
  }
}

const get_plain = (property) => {
  try {
    return property.rich_text[0].plain_text
  } catch (error) {
    return ""
  }
}

const loadTechs = (techs) => {
  let elements = []

  techs.forEach(element => {
    elements.push(<div className={styles.tech}>{element.name}</div>)
  })

  return elements
}


export default Project;