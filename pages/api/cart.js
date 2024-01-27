import dbConnect from '../../config/database';
import Cart from '../../models/cart';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // const carts = await Cart.findAll();
      const carts = await Cart.findAll();
      const totalPrice = carts.reduce((acc, item) => acc + item.totalPrice, 0);
      res.status(200).json(carts, totalPrice);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { productId, name, price, quantity, totalPrice } = req.body;
    try {
      const existingCartItem = await Cart.findOne({ where: { productId } });
      if (existingCartItem) {
  
        // Jika sudah ada, tambahkan ke quantity
        existingCartItem.quantity += quantity;
        existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;

        // Hapus item jika kuantitas kurang dari 1
        if (existingCartItem.quantity < 1) {
          console.log('Deleting item:', existingCartItem.id);
          await existingCartItem.destroy();
          res.status(204).end();
        } else {
          console.log('Updating item:', existingCartItem.id);
          await existingCartItem.save();
          res.status(200).json(existingCartItem);
        }
      } else if (req.method === 'POST') {
        // Jika belum ada, tambahkan sebagai item baru
        const newCartItem = await Cart.create({
          productId,
          name,
          quantity,
          price,
          totalPrice,
        });
        res.status(201).json(newCartItem);
      } else if (req.method === 'DELETE') {
        try {
          // Clear the entire cart
          await Cart.destroy({ where: {} });
          res.status(204).end();
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error', error });
        }
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', eroor });
    }
  }
  // ...Tambahkan logika untuk update dan delete jika diperlukan
}
