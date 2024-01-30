"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from "./app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('/api/cart');
        const itemCount = response.data.carts.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(itemCount);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    const eventSource = new EventSource('/api/cart/events');
    eventSource.addEventListener('cartUpdated', (event) => {
      const { carts, totalPrice } = JSON.parse(event.data);
      setCartItemCount(carts.reduce((acc, item) => acc + item.quantity, 0));
    });

    fetchCartData();

    return () => {
      eventSource.close();
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbar_logo}>
        Bakarin<span>Boss</span>.
      </Link>

      <div className={styles.navbar_nav}>
        <Link href="/" as="/" className={router.pathname === '/' ? styles.active : ''}>
          Home
        </Link>
        <Link href="/about" as="/about" className={router.pathname === '/about' ? styles.active : ''}>
          Tentang Kami
        </Link>
        <Link href="/menu" as="/menu" className={router.pathname === '/menu' ? styles.active : ''}>
          Favorite
        </Link>
        <Link href="/product" as="/product" className={router.pathname === '/product' ? styles.active : ''}>
          Menu
        </Link>
        <Link href="/blog" as="/blog" className={router.pathname === '/blog' ? styles.active : ''}>
          Blog
        </Link>
        <Link href="/contact" as="/contact" className={router.pathname === '/contact' ? styles.active : ''}>
          Kontak
        </Link>
      </div>

      <div className={styles.navbar_extra}>
        <Link href="#" onClick={toggleSearch}>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={{ fontSize: 100, color: "white" }}
            />
          </svg>
        </Link>

        <Link href="/cart" onClick={toggleSearch} className={styles.shopping_cart_button}>
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <FontAwesomeIcon
              icon={faCartPlus}
              style={{ fontSize: 100, color: "white" }}
            />
          </svg>
          {cartItemCount > 0 && <span className="badge bg-danger">{cartItemCount}</span>}
        </Link>

        <Link href="#" id={styles.hamburger_menu}>
          <i data-feather="menu"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
