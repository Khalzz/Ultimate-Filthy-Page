import styles from "../page.module.css";
import Link from "next/link";
import Image from "next/image";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100','400', '700']
})

function CustomFooter() {
  return (
    <footer className={styles.footer}> 
        <p className={roboto.className + " " + styles.footer_text}>Made in Chile with love, passion and lots of caffeine.</p>
        <div className={styles.contact}>
            <Link href="https://github.com/Khalzz" className={styles.contact_link}><Image className={styles.contact_img} src="/icons/Github.svg" width={500} height={500}/></Link>
            <Link href="https://www.instagram.com/khalz_art/" className={styles.contact_link}><Image className={styles.contact_img} src="/icons/instagram.svg" width={500} height={500}/></Link>
            <Link href="https://khalzdev.itch.io/arrowner" className={styles.contact_link}><Image className={styles.contact_img} src="/icons/itch.svg" width={500} height={500}/></Link>
            <Link href="https://stackoverflow.com/users/15073892/khalz" className={styles.contact_link}><Image className={styles.contact_img} src="/icons/stackoverflow.svg" width={500} height={500}/></Link>
          </div>
    </footer>
  );
}

export default CustomFooter
