import React from "react";
import type { NextPageWithLayout } from "../_app";
import Layout from "../../components/layout";
import styles from "../../components/app.module.css";
import ProductCard from "../../components/ProductCard";
import menuImg1 from "../../public/template/img/product/1.jpg";
import menuImg2 from "../../public/template/img/product/2.jpg";
import menuImg3 from "../../public/template/img/product/3.jpg";
import menuImg4 from "../../public/template/img/product/4.jpg";
import menuImg5 from "../../public/template/img/product/5.jpg";

const dataMenu = [
  { id: '1', menuImg: menuImg1, menuPrice: '20000', menuName: 'Sosis Bratwurst Bakar' },
  { id: '2', menuImg: menuImg2, menuPrice: '15000', menuName: 'Baso Bakar' },
  { id: '3', menuImg: menuImg3, menuPrice: '25000', menuName: 'Dumpling Ayam' },
  { id: '4', menuImg: menuImg4, menuPrice: '15000', menuName: 'Dumpling Keju' },
  { id: '5', menuImg: menuImg5, menuPrice: '15000', menuName: 'Scallop' },
];

const Product: NextPageWithLayout = () => {
  return (
    <section className={styles.products} id={styles.products} x-data="products">
      <h2><span>Menu</span> Kami</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ratione,
        temporibus cum laboriosam sunt eligendi.
      </p>

      <div className="row mt-5">
        {dataMenu.map((data) => (
          <ProductCard key={data.id} data={data} />
        ))}
      </div>
    </section>
  );
};

export default Product;

Product.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
