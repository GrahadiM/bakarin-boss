"use client";
import Link from 'next/link';
import { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import styles from "./app.module.css";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className={styles.navbar} x-data>
      <Link href="/" className={styles.navbar_logo}>
        Bakarin<span>Boss</span>.
      </Link>

      <div className={styles.navbar_nav}>
        <Link href="/"> Home</Link>
        <Link href="/about"> Tentang Kami </Link>
        <Link href="/menu"> Menu </Link>
        <Link href="/product"> Produk Kami </Link>
        <Link href="/blog"> Blog </Link>
        <Link href="/contact"> Kontak </Link>
      </div>

      <div className={styles.navbar_extra}>
        <Link href="#" onClick={toggleSearch}>
          <i data-feather="search"></i>
        </Link>

        <Link href="#" onClick={toggleSearch} className={styles.shopping_cart_button}>
          <i data-feather={styles.shopping_cart}></i>
          <span className={styles.quantity_badge} x-show="$store.cart.quantity" x-text="$store.cart.quantity"></span>
        </Link>

        <Link href="#" id={styles.hamburger_menu}>
          <i data-feather="menu"></i>
        </Link>
      </div>

      {/* search form start */}
      <div className={`search-form ${searchOpen ? 'active' : ''}`}>
        <input type="search" id={styles.search_box} placeholder="search here..." />
        <label htmlFor="search-box">
          <i data-feather="search"></i>
        </label>
      </div>
      {/* search form end */}

      {/* Tambahkan komponen Shopping Cart di sini */}
      <ShoppingCart />

    </nav>
  );
};

export default Navbar;
