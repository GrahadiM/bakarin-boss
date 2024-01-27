import dbConnect from '../../config/database';
import OrderProduct from '../../models/orderProduct';
import Cart from '../../models/cart';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const orderProducts = req.body;

      // Ensure that orderProducts is an array
      if (!Array.isArray(orderProducts)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      // Create order products
      const createdOrderProducts = await OrderProduct.bulkCreate(orderProducts);

      // Delete cart items based on productIds
      const productIds = orderProducts.map((product) => product.productId);
      await Cart.destroy({ where: { productId: productIds } });

      console.log('Created item:', orderProducts);
      res.status(201).json(createdOrderProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}