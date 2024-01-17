import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import blogImg from "../public/template/img/artikel/berita1.jpg";

const Blog: NextPageWithLayout = () => {
  return (
    <section id="blog" className={styles.blog}>
      <h2><span>Bl</span>og</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, aspernatur
        accusantium. Quidem ab aliquid corporis.
      </p>

      <div className={styles.row}>
        <div className={styles.blog_card}>
          <Image
            src={blogImg}
            alt="Coffee"
            className={styles.blog_card_img}
          />
          <h3 className={styles.blog_card_title}>- Barbeque From Spanyola -</h3>
          <p className={styles.blog_card_price}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
            illo fugiat magnam atque reiciendis! Sequi.
          </p>
        </div>
        <div className={styles.blog_card}>
          <Image
            src={blogImg}
            alt="Coffee"
            className={styles.blog_card_img}
          />
          <h3 className={styles.blog_card_title}>- Barbeque From Spanyola -</h3>
          <p className={styles.blog_card_price}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum eos
            minus molestiae recusandae accusantium magnam?
          </p>
        </div>
        <div className={styles.blog_card}>
          <Image
            src={blogImg}
            alt="Coffee"
            className={styles.blog_card_img}
          />
          <h3 className={styles.blog_card_title}>- Barbeque From Spanyola -</h3>
          <p className={styles.blog_card_price}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            voluptates aliquid harum porro repellendus mollitia.
          </p>
        </div>
        <div className={styles.blog_card}>
          <Image
            src={blogImg}
            alt="Coffee"
            className={styles.blog_card_img}
          />
          <h3 className={styles.blog_card_title}>- Barbeque From Spanyola -</h3>
          <p className={styles.blog_card_price}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
            repellat non culpa beatae enim quas!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
