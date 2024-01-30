import dbConnect from '../../config/database';
import Cart from '../../models/cart';

dbConnect();

// Helper function to send SSE event
const sendCartUpdateEvent = (res, carts, totalPrice) => {
  res.write(`event: cartUpdated\ndata: ${JSON.stringify({ carts, totalPrice })}\n\n`);
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const carts = await Cart.findAll();
      const totalPrice = carts.reduce((acc, item) => acc + item.totalPrice, 0);
      res.status(200).json({ carts, totalPrice });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'POST') {
    const { productId, name, price, quantity, totalPrice } = req.body;
    try {
      const existingCartItem = await Cart.findOne({ where: { productId } });
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.price;

        if (existingCartItem.quantity < 1) {
          await existingCartItem.destroy();
          sendCartUpdateEvent(res, [], 0); // Send update event
          res.status(204).end();
        } else {
          await existingCartItem.save();
          sendCartUpdateEvent(res, [existingCartItem], existingCartItem.totalPrice); // Send update event
          res.status(200).json(existingCartItem);
        }
      } else {
        // Jika belum ada, tambahkan sebagai item baru
        const newCartItem = await Cart.create({
          productId,
          name,
          quantity,
          price,
          totalPrice,
        });
        sendCartUpdateEvent(res, [newCartItem], newCartItem.totalPrice); // Emit SSE event after adding new item
        res.status(201).json(newCartItem);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { productIds } = req.body;

      // Ensure productIds is an array
      if (!Array.isArray(productIds)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      // Delete cart items by product IDs
      await Cart.destroy({
        where: {
          productId: productIds,
        },
      });

      sendCartUpdateEvent(res); // Emit SSE event after deleting items
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}
