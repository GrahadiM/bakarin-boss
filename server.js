const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Gantilah dengan clientKey dan serverKey yang sesuai dari Midtrans
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: 'YOUR_SERVER_KEY',
  clientKey: 'YOUR_CLIENT_KEY',
});

app.post('/api/midtrans/snap-token', async (req, res) => {
  try {
    const orderId = req.body.orderId;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: 100000, // Gantilah dengan total harga order
      },
    };

    const snapTokenResponse = await snap.createTransactionToken(parameter);

    return res.status(200).json({
      snapToken: snapTokenResponse.token,
    });
  } catch (error) {
    console.error('Error creating Snap Token:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
