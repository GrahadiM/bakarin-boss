import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', img: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products. Please try again later.');
    }
  };

  const createProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', newProduct.price);
      formData.append('img', newProduct.img);

      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewProduct({ name: '', price: '', img: '' });
      getProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Error creating product. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Product List</h1>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <img src={product.img} alt={product.name} style={{ maxWidth: '100px' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Product</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, img: e.target.files[0] })} />
      </div>
      <button onClick={createProduct}>Create Product</button>
    </div>
  );
};

export default Products;