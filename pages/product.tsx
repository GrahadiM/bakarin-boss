import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import menuImg1 from "../public/template/img/product/1.jpg";
import menuImg2 from "../public/template/img/product/2.jpg";
import menuImg3 from "../public/template/img/product/3.jpg";
import menuImg4 from "../public/template/img/product/4.jpg";
import menuImg5 from "../public/template/img/product/5.jpg";
// import cartImg from "../public/template/img/feather-sprite.svg#shopping-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faCartPlus,
  faEye,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const dataMenu = [
  {id: '1', menuImg: menuImg1, menuPrice: '20000', menuName: 'Sosis Bratwurst Bakar'},
  {id: '2', menuImg: menuImg2, menuPrice: '15000', menuName: 'Baso Bakar'},
  {id: '3', menuImg: menuImg3, menuPrice: '25000', menuName: 'Dumpling Ayam'},
  {id: '4', menuImg: menuImg4, menuPrice: '15000', menuName: 'Dumpling Keju'},
  {id: '5', menuImg: menuImg5, menuPrice: '15000', menuName: 'Scallop'},
];

console.log(dataMenu);

const Product: NextPageWithLayout = () => {
  return (
    <section className={styles.products} id={styles.products} x-data="products">
      <h2><span>Menu</span> Kami</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ratione,
        temporibus cum laboriosam sunt eligendi.
      </p>

      <div className="row mt-5">
        {dataMenu.map((data) => {
          return (
            <div className="col-12 col-md-4 mt-4" x-for="(item, index) in items" x-key="index">
              <div className={styles.product_card}>
                <div className={styles.product_icon}>
                  <a href="#">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        style={{ fontSize: 100, color: "white" }}
                      />
                    </svg>
                  </a>
                  <a href="#" className={styles.item_detail_button}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                    <FontAwesomeIcon
                      icon={faEye}
                      style={{ fontSize: 100, color: "white" }}
                    />
                    </svg>
                  </a>
                </div>
                <div className={styles.product_image}>
                  <Image src={(data.menuImg)} alt="item.name" className="img-fluid" />
                </div>
                <div className={styles.product_content}>
                  <h3 x-text="item.name">{(data.menuName).toString()}</h3>
                  <div className={styles.product_stars}>
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 100, color: "orange" }}
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 100, color: "orange" }}
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 100, color: "orange" }}
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 100, color: "orange" }}
                      />
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 100, color: "orange" }}
                      />
                    </svg>
                  </div>
                  <div className={styles.product_price}>
                    <span x-text="rupiah(item.price)"></span>
                  </div>
                </div>
              </div>
            </div>
        )})}
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
