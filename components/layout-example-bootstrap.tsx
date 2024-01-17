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
      <h1 className='text-center text danger'>Hy Alfian</h1>
    </>
  );
}