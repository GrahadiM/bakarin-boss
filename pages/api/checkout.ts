import { cors, runMiddleware } from '../../middlewares/cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import MidtransClient from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const orderId = req.query.id;

      const orderResponse = await axios.get(`/api/order?id=${orderId}`);
      const orderProductResponse = await axios.get(`/api/orderProduct?orderId=${orderId}`);
      const order = orderResponse.data;
      const orderProduct = orderProductResponse.data;

      const snap = new MidtransClient.Snap({
        isProduction: false,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const itemDetails = orderProduct.map((product) => ({
        id: product.id,
        price: product.price,
        quantity: product.quantity,
        name: product.name,
      }));

      const snapOptions = {
        transaction_details: {
          order_id: order.id,
          gross_amount: order.totalPrice,
        },
        item_details: itemDetails,
      };

      snap.createTransactionToken(snapOptions, (err, token) => {
        if (err) {
          console.error('Error creating Snap token:', err);
          res.status(500).json({ error: 'Error creating Snap token' });
        } else {
          // Send Snap token as response
          res.status(200).json({ snapToken: token });
        }
      });
    } catch (error) {
      console.error('Error fetching order data:', error);
      res.status(500).json({ error: 'Error fetching order data' });
    }
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);
  await handler(req, res);
}