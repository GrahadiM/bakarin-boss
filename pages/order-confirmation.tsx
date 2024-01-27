import React from 'react';
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import styles from "../components/app.module.css";

const OrderConfirmation: NextPageWithLayout = () => {
  return (
    <section className={styles.products} id={styles.products}>
      <h2>Order Confirmation</h2>
      <p>
        Thank you for your order! Your order has been confirmed.
      </p>
      {/* You can add more details or components related to the order confirmation */}
    </section>
  );
};

export default OrderConfirmation;

OrderConfirmation.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
