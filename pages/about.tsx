import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import aboutImg from "../public/template/img/menu2.jpg";

const About: NextPageWithLayout = () => {
  return (
    <section id="about" className={styles.about}>
      <h2><span>Tentang</span> Kami</h2>

      <div className={styles.row}>
        <div className={styles.about_img}>
          <Image src={aboutImg} alt="Tentang Kami" />
        </div>
        <div className={styles.content}>
          <h3>Kenapa Memilih Menu kami?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, illo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            ipsam atque unde maiores rem aspernatur consequatur delectus
            assumenda magnam impedit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
