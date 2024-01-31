import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout";
import styles from "../components/app.module.css";

const Cart = () => {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartWithProducts, setCartWithProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cartResponse = await axios.get('/api/cart');
      const productResponse = await axios.get('/api/products');
      const cartItems = cartResponse.data.carts;
  
      const cartWithProducts = cartItems.map((cartItem) => {
        const product = productResponse.data.find((product) => product.id === cartItem.productId);
        return {
          ...cartItem,
          product: product || {},
        };
      });
  
      setCartWithProducts(cartWithProducts);
      calculateTotalPrice(cartWithProducts);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: 1 });
      fetchData();
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: -1 });
      fetchData();
      router.reload();
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
      const orderProducts = cartWithProducts.map((item) => ({
        orderId: orderResponse.data.id,
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
      }));

      // Create order products
      await axios.post('/api/orderProduct', orderProducts);
      console.log('Created Order Products:', orderProducts);

      // Get product IDs from cart
      const productIds = cartWithProducts.map((item) => item.productId);

      // Delete cart items by product IDs
      await axios.delete('/api/cart', { data: { productIds } });
      console.log('Deleted Cart Items:', productIds);

      setTotalPrice(0);
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
        {cartWithProducts.length === 0 ? (
          <>
            <h3 className='text-center'>Data Belum Tersedia!</h3>
            <div className='text-center mt-3'>
              <button onClick={() => router.push('/product')} className='btn btn-outline-primary'>
                Kembali ke Menu
              </button>
            </div>
          </>
        ) : (
          <table className="table table-responsive table-dark table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartWithProducts.map((data) => (
                <tr key={data?.id}>
                  <td>
                    <Image src={data?.product?.img} alt={data?.product?.name} alt="Menu" className="img-fluid" width="120" height="120" />
                  </td>
                  <td>{data?.name}</td>
                  <td>{formatCurrency(data?.totalPrice)}</td>
                  <td>{data?.quantity}</td>
                  <td>
                    <button onClick={() => handleIncreaseQuantity(data?.productId)} className='btn btn-sm btn-outline-primary me-2'>
                      <FontAwesomeIcon icon={faPlusSquare} style={{ fontSize: 20 }} />
                    </button>
                    <button onClick={() => handleDecreaseQuantity(data?.productId)} className='btn btn-sm btn-outline-danger'>
                      <FontAwesomeIcon icon={faMinusSquare} style={{ fontSize: 20 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className='text-end mt-3'>
          <h5>Total: {formatCurrency(totalPrice)}</h5>
          <button onClick={handleCheckout} className='btn btn-primary' disabled={cartWithProducts.length === 0}>
            <FontAwesomeIcon icon={faShoppingCart} className='me-2' />
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

Cart.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Cart;