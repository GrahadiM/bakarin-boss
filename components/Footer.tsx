import styles from "./app.module.css";
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.socials}>
        <Link href="#"><i data-feather="instagram"></i></Link>
        <Link href="#"><i data-feather="twitter"></i></Link>
        <Link href="#"><i data-feather="facebook"></i></Link>
      </div>

      <div className={styles.links}>
        <Link href="/"> Home</Link>
        <Link href="/about"> Tentang Kami </Link>
        <Link href="/menu"> Menu </Link>
        <Link href="/products"> Produk Kami </Link>
        <Link href="/blog"> Blog </Link>
        <Link href="/contact"> Kontak </Link>
      </div>

      <div className={styles.credit}>
        <p>Created by <Link href="">fianfirdaus</Link> | &copy; 2023.</p>
      </div>
    </div>
  );
};

export default Footer;
