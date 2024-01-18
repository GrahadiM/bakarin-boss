import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import menuImg from "../public/template/img/Menu/menu.jpg";

const Menu: NextPageWithLayout = () => {
  return (
    <section id="menu" className={styles.menu}>
      <h2><span>Menu Favo</span>rite Kami</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, aspernatur
        accusantium. Quidem ab aliquid corporis.
      </p>

      <div className={styles.row}>
        <div className={styles.menu_card}>
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className={styles.menu_card_img}
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>IDR 20K</p>
        </div>
        <div className={styles.menu_card}>
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className={styles.menu_card_img}
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>IDR 20K</p>
        </div>
        <div className={styles.menu_card}>
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className={styles.menu_card_img}
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>IDR 20K</p>
        </div>
        <div className={styles.menu_card}>
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className={styles.menu_card_img}
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>IDR 20K</p>
        </div>
        <div className={styles.menu_card}>
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className={styles.menu_card_img}
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>IDR 20K</p>
        </div>
      </div>
    </section>
  );
};

export default Menu;

Menu.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
