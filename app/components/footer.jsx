import styles from "../page.module.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['100','400', '700']
})

function CustomFooter() {
  return (
    <footer className={styles.footer}> 
        <p className={roboto.className + " " + styles.footer_text}>Made in Chile with love, passion and lots of caffeine.</p>
    </footer>
  );
}

export default CustomFooter
