import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import menuImg from "../public/template/img/Menu/menu.jpg";

const Menu: NextPageWithLayout = () => {
  return (
    <section id="menu" className={styles.menu}>
      <h2><span>Menu</span> Favorite</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, aspernatur
        accusantium. Quidem ab aliquid corporis.
      </p>

      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-3 mt-4 text-center">
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className="img-fluid rounded-5 mb-3"
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>Rp.20.000</p>
        </div>
        <div className="col-12 col-md-3 mt-4 text-center">
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className="img-fluid rounded-5 mb-3"
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>Rp.20.000</p>
        </div>
        <div className="col-12 col-md-3 mt-4 text-center">
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className="img-fluid rounded-5 mb-3"
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>Rp.20.000</p>
        </div>
        <div className="col-12 col-md-3 mt-4 text-center">
          <Image
            src={menuImg}
            alt="Mexican Burger"
            className="img-fluid rounded-5 mb-3"
          />
          <h3 className={styles.menu_card_title}>- Mexican Burger -</h3>
          <p className={styles.menu_card_price}>Rp.20.000</p>
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
