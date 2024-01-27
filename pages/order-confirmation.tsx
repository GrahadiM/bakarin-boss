import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '../components/layout';
import styles from '../components/app.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { Order, OrderProduct } from './types'; // Import the types

const OrderConfirmation: NextPageWithLayout = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get ID order dari query parameter
        const orderId = router.query.id;

        // Get order data using GET method with query parameter
        const orderResponse = await axios.get(`/api/order?id=${orderId}`); // Ganti ID sesuai yang diinginkan
        console.log(orderResponse);

        // Simpan order ke state
        setOrders([orderResponse.data]);

        // Dapatkan order product data
        const orderProductResponse = await axios.get(`/api/orderProduct?orderId=${orderId}`); // Ganti ID sesuai yang diinginkan
        console.log(orderProductResponse);

        // Simpan order product ke state
        setOrderProducts(orderProductResponse.data);
      } catch (error) {
        console.error('Error fetching order confirmation data:', error);
      }
    };

    fetchData();
  }, [router.query.id]);

  return (
    <section className={styles.products} id={styles.products}>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! Your order has been confirmed.</p>
      <h3>Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Customer Name: {order.customerName}</p>
            <p>Total Price: {order.totalPrice}</p>
          </li>
        ))}
      </ul>
      <h3>Order Products:</h3>
      <ul>
        {orderProducts.map((orderProduct) => (
          <li key={orderProduct.id}>
            <p>Product Name: {orderProduct.name}</p>
            <p>Quantity: {orderProduct.quantity}</p>
            <p>Price: {orderProduct.price}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrderConfirmation;

OrderConfirmation.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
