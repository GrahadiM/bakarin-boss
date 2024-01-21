import dbConnect from '../../config/database';
import Product from '../../models/product';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name, price, img } = req.body;
    try {
      const product = await Product.create({ name, price, img });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
