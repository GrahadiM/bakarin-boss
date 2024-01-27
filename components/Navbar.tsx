"use client";
import Link from 'next/link';
import { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import styles from "./app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navbar_logo}>
        Bakarin<span>Boss</span>.
      </Link>

      <div className={styles.navbar_nav}>
        <Link href="/"> Home</Link>
        <Link href="/about"> Tentang Kami </Link>
        <Link href="/menu"> Favorite </Link>
        <Link href="/product"> Menu </Link>
        <Link href="/blog"> Blog </Link>
        <Link href="/contact"> Kontak </Link>
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
        </Link>

        <Link href="#" id={styles.hamburger_menu}>
          <i data-feather="menu"></i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
