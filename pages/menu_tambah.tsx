import Link from "next/link";
import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import type { NextPageWithLayout } from "../_app";
import { Modal, Button } from "react-bootstrap";
import Layout from "../components/layout";
import styles from "../components/app.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faStar } from "@fortawesome/free-solid-svg-icons";

const ProductAdd: NextPageWithLayout = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    img: ''
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('img', newProduct.img);
  
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Product created:', response.data);
      // Refresh the product list after creating a new product
      getProducts();
      setNewProduct({ name: '', price: 0, img: '' });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post('/api/cart', {
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        totalPrice: product.price,
      });
      setCart(response.data);
      // router.reload();
      console.log('Product added to cart', response.data);
    } catch (error) {
      console.error('Error adding product to cart', error);
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

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <div className="col-1 col-star" key={index}>
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <FontAwesomeIcon
          icon={faStar}
          style={{ fontSize: 100, color: "orange" }}
        />
      </svg>
    </div>
  ));

  return (
    <section className={styles.products} id={styles.products} x-data="products">
      <h2><span>Menu</span> Kami</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ratione,
        temporibus cum laboriosam sunt eligendi.
      </p>

      <div className="row mt-5">
      <div className={styles.product_content}>
          <h3>Buat Produk Baru</h3>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Nama Produk:</label>
            <input
              type="text"
              className="form-control"
              id="productName"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Harga:</label>
            <input
              type="number"
              className="form-control"
              id="productPrice"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">Gambar Produk:</label>
            <input
              type="file"
              className="form-control"
              id="productImage"
              accept="image/*"
              onChange={(e) => setNewProduct({ ...newProduct, img: e.target.files[0] })}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreateProduct}
          >
            Tambah Produk
          </button>
        </div>
        {products.map((data) => {
          return (
            <div className="col-12 col-md-4 mt-4" x-for="(item, index) in items" x-key="index">
              <div className={styles.product_card}>
                <div className={styles.product_icon}>
                  <Link href="" onClick={() => handleAddToCart(data)}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        style={{ fontSize: 100, color: "white" }}
                      />
                    </svg>
                  </Link>
                  <Link href="" onClick={() => handleShowModal(data)}>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <FontAwesomeIcon
                        icon={faEye}
                        style={{ fontSize: 100, color: "white" }}
                      />
                    </svg>
                  </Link>
                </div>
                <div className={styles.product_image}>
                  <Image
                    src={data?.img}
                    alt="Menu"
                    className="img-fluid"
                    width="300"
                    height="300"
                  />
                </div>
                <div className={styles.product_content}>
                  <h3>{data?.name}</h3>
                  <div className="row mb-2">
                    <div className="col-3"></div>
                    {stars}
                    <div className="col-3"></div>
                  </div>
                  <div className={styles.product_price}>
                    <span>{formatCurrency(data?.price)}</span>
                  </div>
                </div>
              </div>

              <Modal className="modal_" show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header className="text-white bg-dark" closeButton>
                  <Modal.Title>Detail Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-white bg-dark">
                  {selectedProduct && (
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <Image src={selectedProduct?.img} alt="Menu" className="img-fluid" width="500" height="500" />
                      </div>
                      <div className="col-sm-12 col-md-6">
                        <h3>{selectedProduct?.name}</h3>
                        <span>{formatCurrency(selectedProduct?.price)}</span>
                      </div>
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer className="text-white bg-dark">
                  <Button variant="btn btn-danger" onClick={handleCloseModal}>
                    Tutup
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default ProductAdd;

ProductAdd.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
