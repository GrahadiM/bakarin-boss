import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from './_app';
import Layout from '../components/layout';
import styles from '../components/app.module.css';
import type { Order, OrderProduct } from './types';
import MidtransClient from 'midtrans-client';

const OrderConfirmation: NextPageWithLayout = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const fetchData = async (order: Order) => {
    try {
      const orderId = router.query.id;
      const orderResponse = await axios.get(`/api/order?id=${orderId}`);
      setOrders([orderResponse.data]);
      const orderProductResponse = await axios.get(`/api/orderProduct?orderId=${orderId}`);
      setOrderProducts(orderProductResponse.data);
    } catch (error) {
      console.error('Error fetching order confirmation data:', error);
    }
  };

  const handlePayment = async (order: Order, orderProducts: OrderProduct[]) => {
    setLoading(true);

    const example = {
      "name": "Justin",
      "email": "justinzu93@gmail.com",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwMWUwMWViZjNjZjkyMjcwMDI3ZmIzMCJ9LCJleHAiOjE2MTI4ODAyOTIsImlhdCI6MTYxMjYyMTA5Mn0.pgKyPnmkcJ7EjDvlJ869DeD9FJkJTlnaTBltFT99QWM",
      "_id": "601e01ebf3cf92270027fb30",
      "iat": 1612622771,
      "exp": 1612633571
    }
    // const token = example.accessToken;
    const token = 'U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p3ZnMzVV8LZU87';

    const snap = new MidtransClient.Snap({
      isProduction: false,
      clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
      serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    });

    const parameter = {
      "item_details": orderProducts.map(product => ({
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity,
      })),
      "transaction_details": {
        "order_id": order.id,
        "gross_amount": order.totalPrice
      },
    }

    try {
      const response = await fetch("/api/checkout",{
        headers: {
          'Accept'        : 'application/json',
          'Authorization' : 'Bearer ' + token,
          'Content-Type'  : 'application/json',
        },
        method: "POST",
        body: JSON.stringify(parameter),
      });
      const data = await response.json();
      console.log(data);

      const snapOptions = {
        token: data.snapToken,
      };
  
      const transactionToken = await snap.createTransactionToken(snapOptions);
      const snapToken = transactionToken.token;
      console.log('Snap Token:', snapToken);
      // Redirect to Snap page for payment
      window.location.href = `https://app.sandbox.midtrans.com/snap/v1/vtweb/${snapToken}`;
    } catch (error) {
      console.error('Error initiating payment:', error);
      setLoading(false);
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
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order?.id}>
                <td>{order?.id}</td>
                <td>{order?.customerName}</td>
                <td>{order?.customerPhone}</td>
                <td>{order?.customerAddress}</td>
                <td>{order?.totalPrice}</td>
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
              <tr key={orderProduct?.id}>
                <td>{orderProduct?.name}</td>
                <td>{orderProduct?.quantity}</td>
                <td>{orderProduct?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="text-end mt-3">
        <Link href="/product" className="btn btn-danger mx-3">
          Menu
        </Link>
        <button
          onClick={() => handlePayment(orders[0], orderProducts)}
          className={`btn btn-success ${orders.length === 0 ? 'disabled' : ''}`}
          disabled={orders.length === 0 || loading}
        >
          {loading ? 'Processing...' : 'Bayar'}
        </button>
      </div>
    </section>
  );
};

export default OrderConfirmation;

OrderConfirmation.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
