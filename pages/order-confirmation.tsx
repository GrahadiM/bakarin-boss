import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '../components/layout';
import styles from '../components/app.module.css';
import type { Order, OrderProduct } from './types';

const OrderConfirmation: NextPageWithLayout = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const fetchData = async () => {
    try {
      const orderId = router.query.id;
      const orderResponse = await axios.get(`/api/order?id=${orderId}`);
      console.log(orderResponse);
      setOrders([orderResponse.data]);
      const orderProductResponse = await axios.get(`/api/orderProduct?orderId=${orderId}`);
      console.log(orderProductResponse);
      setOrderProducts(orderProductResponse.data);
    } catch (error) {
      console.error('Error fetching order confirmation data:', error);
    }
  };

  const handleSnapPayment = async () => {
    try {
      const orderId = router.query.id;
      const snapTokenResponse = await axios.post('/api/midtrans/snap-token', { orderId });
      const snapToken = snapTokenResponse.data.snapToken;
      const snapBaseUrl = 'https://app.sandbox.midtrans.com/snap/v1';
      const snapUrl = `${snapBaseUrl}/token/${snapToken}`;
      window.location.href = snapUrl;
    } catch (error) {
      console.error('Error initiating Snap payment:', error);
    }
  };

  return (
    <section className={styles.products} id={styles.products}>
      <h2><span>Konfirmasi</span> Orderan</h2>
      <p>Thank you for your order! Your order has been confirmed.</p>

      <h3 className="mt-5">Detail Orderan</h3>
      {orders.length === 0 ? (
        <h5 className="text-center fw-bold">Data Belum Tersedia!</h5>
      ) : (
        <table className="table table-responsive table-dark table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="mt-5">Detail Produk Orderan</h3>
      {orderProducts.length === 0 ? (
        <h5 className="text-center fw-bold">Data Belum Tersedia!</h5>
      ) : (
        <table className="table table-responsive table-dark table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderProducts.map((orderProduct) => (
              <tr key={orderProduct.id}>
                <td>{orderProduct.name}</td>
                <td>{orderProduct.quantity}</td>
                <td>{orderProduct.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-end mt-3">
        <Link href="/product" className="btn btn-danger mx-3">
          Menu
        </Link>
        <button onClick={handleSnapPayment} className={`btn btn-success ${orders.length === 0 ? 'disabled' : ''}`} disabled={orders.length === 0}>
          Bayar
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;

OrderConfirmation.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
