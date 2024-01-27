import dbConnect from '../../config/database';
import OrderProduct from '../../models/orderProduct';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Jika terdapat parameter ID pada query, cari order products berdasarkan ID order
      if (req.query.orderId) {
        const orderId = req.query.orderId;
        const orderProducts = await OrderProduct.findAll({
          where: { orderId: orderId },
        });

        res.status(200).json(orderProducts);
      } else {
        // Jika tidak ada parameter ID, ambil semua order products
        const allOrderProducts = await OrderProduct.findAll();
        res.status(200).json(allOrderProducts);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else if (req.method === 'POST') {
    try {
      const orderProducts = req.body;

      // Ensure that orderProducts is an array
      if (!Array.isArray(orderProducts)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }

      // Create order products
      const createdOrderProducts = await OrderProduct.bulkCreate(orderProducts);

      console.log('Created items:', orderProducts);
      res.status(201).json(createdOrderProducts);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
}