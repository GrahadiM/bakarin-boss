import type { NextPageWithLayout } from "./_app";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import aboutImg from "../public/template/img/menu2.jpg";

const About: NextPageWithLayout = () => {
  return (
    <section id="about" className={styles.about}>
      <h2>
        <span>Tentang</span> Kami
      </h2>

      <div className={styles.row}>
        <div className={styles.about_img}>
          <Image src={aboutImg} alt="Tentang Kami" />
        </div>
        <div className={styles.content}>
          <h3>Kenapa Memilih Menu kami?</h3>
          <h3>Selamat datang di Bakarin Boss,</h3>
          <p>
            tempat paling asyik untuk menikmati sajian bakar-bakaran yang
            menggugah selera! Kami di Bakarin Boss percaya bahwa makanan yang
            lezat tidak hanya memenuhi perut, tetapi juga menciptakan pengalaman
            tak terlupakan. Dengan bangga kami hadirkan beragam menu
            bakar-bakaran yang diracik dengan teliti untuk memanjakan lidah
            Anda. Tak hanya itu, Bakarin Boss bukan hanya sekadar tempat makan,
            tapi juga sebuah gaya hidup. Kami menciptakan suasana yang hangat
            dan ramah, di mana setiap hidangan tidak hanya berbicara tentang
            rasa, tetapi juga tentang identitas unik kami. Setiap hidangan
            adalah karya seni, mencerminkan dedikasi kami dalam menciptakan
            momen istimewa melalui makanan dan minuman. Selamat menikmati
            sensasi bakaran yang menggoda di Bakarin Boss, di mana setiap
            gigitan adalah perjalanan rasa yang tak terlupakan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

About.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
