import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPageWithLayout } from "./_app";
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cart: NextPageWithLayout = () => {

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCart(response.data);
      calculateTotalPrice(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: 1 });
      getCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: -1 });
      getCart();
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotalPrice(total);
    console.log('total harga :', total);
  };

  const handleCheckout = async () => {
    try {
      // Create an order
      const orderResponse = await axios.post('/api/order', {
        customerName: 'Alfian',
        totalPrice,
      });
      console.log('Created Order:', orderResponse);

      // Prepare order products array
      const orderProducts = cart.map(item => ({
        orderId: orderResponse.data.id,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      }));

      // Create order products
      await axios.post('/api/orderProduct', orderProducts);
      console.log('Created Order Product:', orderProducts);

      // Clear the cart after successful checkout
      setCart([]);
      setTotalPrice(0);
      console.log('Deleted Cart!');

      // Redirect to the order confirmation page or any other page
      router.push(`/order-confirmation?id=${orderResponse.data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  function formatCurrency(value) {
    if (!value) return "Rp 0";

    const numericValue = Number(value);

    if (isNaN(numericValue)) return "Invalid Number";

    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericValue);

    return formattedValue;
  }

  return (
    <section className={styles.products} id={styles.products}>
      <h2><span>Keranjang</span> Anda</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ratione,
        temporibus cum laboriosam sunt eligendi.
      </p>

      <div className="row mt-5">
        {cart.length === 0 ? (
          <h3 className='text-center'>Data Belum Tersedia!</h3>
        ) : (
          <ul className='col-12'>
            {cart.map((data) => (
              <li key={data?.id} className='mb-3'>
                {data?.name} - {formatCurrency(data?.totalPrice)} -
                Quantity: {data?.quantity}
                <button onClick={() => handleIncreaseQuantity(data?.productId)} className='btn btn-sm btn-outline-primary mx-2'>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    style={{ fontSize: 25, color: "white" }}
                  />
                </button>
                <button onClick={() => handleDecreaseQuantity(data?.productId)} className='btn btn-sm btn-outline-danger mx-2'>
                  <FontAwesomeIcon
                    icon={faMinusSquare}
                    style={{ fontSize: 25, color: "white" }}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className='text-end mt-3'>
          <h5>Total: {formatCurrency(totalPrice)}</h5>
          <button onClick={handleCheckout} className='btn btn-primary'>
            <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;

Cart.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
