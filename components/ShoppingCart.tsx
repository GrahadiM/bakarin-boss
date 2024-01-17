import { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const removeItem = (itemId) => {
    // Implement logic to remove item from cart
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const addItem = (item) => {
    // Implement logic to add item to cart
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    // Implement logic to calculate total
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement logic for form submission (e.g., checkout)
  };

  return (
    <div className="shopping-cart">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={`img/product/${item.img}`} alt={item.name} />
              <div className="item-detail">
                <h3>{item.name}</h3>
                <div className="item-price">
                  <span>{rupiah(item.price)}</span> &times;
                  <button onClick={() => removeItem(item.id)}>&minus;</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItem(item)}>&plus;</button>
                  &equals;
                  <span>{rupiah(item.total)}</span>
                </div>
              </div>
            </div>
          ))}
          <h4>Total : {rupiah(calculateTotal())}</h4>

          <div className="form-container">
            <form onSubmit={handleSubmit} id="checkoutForm">
              <h5>Customer Detail</h5>

              <label htmlFor="name">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label htmlFor="email">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="phone">
                <span>Phone</span>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <button type="submit" className="checkout-button" id="checkout-button" value="checkout">
                Checkout
              </button>
            </form>
          </div>
        </>
      ) : (
        <h4 style={{ marginTop: '1rem' }}>Cart is Empty</h4>
      )}
    </div>
  );
};

export default ShoppingCart;
