'use client'
import 'bootstrap/dist/css/bootstrap.css'
import styles from "./app.module.css";
import { Inter } from 'next/font/google'
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ['latin'] })

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Layouts Example</title>
      </Head>
      <div className={styles.body}>
        <style jsx global>{`
          :root {
            --primary: orange !important;
            --bg: #010101 !important;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            outline: none;
            border: none;
            text-decoration: none;
          }

          /* HTML */
          html {
            scroll-behavior: smooth !important;
          }

          /* Body */
          body {
            font-family: "Poppins", sans-serif;
            background-color: var(--bg);
            color: #fff;
          }
          
          /* Footer */
          footer {
            background-color: var(--primary);
            text-align: center;
            padding: 1rem 0 3rem;
            margin-top: 3rem;
          }

          footer .socials {
            padding: 1rem 0;
          }

          footer .socials a {
            color: #fff;
            margin: 1rem;
          }

          footer .socials a:hover,
          footer .links a:hover {
            color: var(--bg);
          }

          footer .links {
            margin-bottom: 1.4rem;
          }

          footer .links a {
            color: #fff;
            padding: 0.7rem 1rem;
          }

          footer .credit {
            font-size: 0.8rem;
          }

          footer .credit a {
            color: var(--bg);
            font-weight: 700;
          }

          /* Link */
          a { text-decoration:none; }
          
          /* Col Star */
          .col-star {
            width:10% !important;
          }
          
          /* Modal */
          .modal_ {
            margin-top:5rem !important;
          }

          /* Carousel */
          .carousel-mt {
            margin-top:20% !important;
          }

          /* Banner */
          .app_hero__4id8a {
            mask-image: none !important;
            -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0)) !important;
          }
          
          .app_contact__1CcTi .app_row__LMlli .app_map___27Ww {
            height: 50rem !important;
          }
        `}</style>
        <main className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}