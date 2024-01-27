import Link from "next/link";
import { Carousel } from "react-bootstrap";
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import Image from "next/image";
import styles from "../components/app.module.css";
import menuImg1 from "../public/template/img/product/1.jpg";
import menuImg2 from "../public/template/img/product/2.jpg";
import menuImg3 from "../public/template/img/product/3.jpg";

const dataMenu = [
  { id: '1', menuImg: menuImg1, menuPrice: '20000', menuName: 'Sosis Bratwurst Bakar' },
  { id: '2', menuImg: menuImg2, menuPrice: '15000', menuName: 'Baso Bakar' },
  { id: '3', menuImg: menuImg3, menuPrice: '25000', menuName: 'Dumpling Ayam' },
];

function formatCurrency(value) {
  if (!value) return "Rp 0";

  const numericValue = Number(value);

  if (isNaN(numericValue)) return "Invalid Number";

  const formattedValue = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numericValue);

  return formattedValue;
}

const Index: NextPageWithLayout = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.mask_container}>
        <main className={styles.content}>
          <h1>
            Semua orang bisa membakar, tetapi kami memberikan rasa dan sensasi
            <span>Berbeda</span> dari yang biasa orang lain bakar
          </h1>
          <Link href="/product" className="text-white"><p>Please enjoy with our menu !</p></Link>
        </main>
        <div className="carousel-container carousel-mt">
          <Carousel>
            {dataMenu.map((data) => (
              <Carousel.Item key={data?.id} className="text-center">
                <Link href="/product">
                  <Image src={data?.menuImg} alt="Image Slider" className="img-thumbnail" width="500" height="500" />
                  <Carousel.Caption>
                    <h3 className="fw-bold">{data?.menuName}</h3>
                    <h5 className="fw-bold">{formatCurrency(data?.menuPrice)}</h5>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
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
