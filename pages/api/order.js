import dbConnect from '../../config/database';
import Order from '../../models/order';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerName, totalPrice } = req.body;
    try {
      const order = await Order.create({ customerName, totalPrice });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}