import dbConnect from '../../config/database';
import User from '../../models/user';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name, email, phone } = req.body;
    try {
      const user = await User.create({ name, email, phone });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, email, phone } = req.body;
    try {
      const updatedUser = await User.update(
        { name, email, phone },
        { where: { id } }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      await User.destroy({ where: { id } });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
