import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import styles from "../components/app.module.css";

const Index: NextPageWithLayout = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.mask_container}>
        <main className={styles.content}>
          <h1>
            Semua orang bisa membakar, tetapi kami memberikan rasa dan sensasi
            <span>Berbeda</span> dari yang biasa orang lain bakar
          </h1>
          <p>Please enjoy with our menu !</p>
        </main>
      </div>
    </section>
  );
};

export default Index;

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
