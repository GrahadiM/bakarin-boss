import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { NextPageWithLayout } from "./_app";
import Image from 'next/image'
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import menuImg from "../public/template/img/Menu/menu.jpg";

const Menu: NextPageWithLayout = () => {
  const [favoriteMenu, setFavoriteMenu] = useState([]);

  useEffect(() => {
    const fetchFavoriteMenu = async () => {
      try {
        const response = await axios.get('/api/menuFavorite');
        const favoriteMenuData = response.data;

        setFavoriteMenu(favoriteMenuData);
      } catch (error) {
        console.error('Error fetching favorite menu:', error);
      }
    };

    fetchFavoriteMenu();
  }, []);

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

  return (
    <section id="menu-favorite" className={styles.menu}>
      <h2>
        <span>Menu</span> Favorite
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, aspernatur
        accusantium. Quidem ab aliquid corporis.
      </p>

      <div className="row justify-content-center mt-5">
        {favoriteMenu.length === 0 ? (
          <div className='col-12 col-md-3 mt-4 text-center'>
            <h3>Maaf Tidak Ada Pesanan!</h3>
          </div>
        ) : (
          favoriteMenu.map((menu) => (
            <div key={menu?.id} className="col-12 col-md-3 mt-4 text-center">
              <Link href="/product" className='text-white'>
                <Image
                  src={menu?.img}
                  alt={menu?.name}
                  className="img-fluid rounded-5 mb-3"
                  width="300"
                  height="300"
                />
                <h3 className={styles.menu_card_title}>{menu?.name}</h3>
                <span className={styles.menu_card_price}>{formatCurrency(menu?.price)}</span>
              </Link>
            </div>
          ))
        )}
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
