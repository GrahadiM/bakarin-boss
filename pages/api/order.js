import dbConnect from '../../config/database';
import Order from '../../models/order';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Jika terdapat parameter ID pada query, cari order berdasarkan ID
      if (req.query.id) {
        const orderId = req.query.id;
        const order = await Order.findByPk(orderId);
        
        if (!order) {
          return res.status(404).json({ message: 'Order not found' });
        }

        return res.status(200).json(order);
      }

      // Jika tidak ada parameter ID, ambil semua order
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'POST') {
    const { customerName, totalPrice } = req.body;
    try {
      const order = await Order.create({ customerName, totalPrice });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}
