import dbConnect from '../../config/database';
import Product from '../../models/product';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

dbConnect();

const productImageDir = path.join(process.cwd(), 'public', 'template', 'img', 'product');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      await fs.mkdir(productImageDir, { recursive: true });

      const form = new formidable.IncomingForm();
      form.uploadDir = productImageDir;
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        const { name, price } = fields;

        const imgPath = files.img.path;

        try {
          // Ubah nama file sesuai kebutuhan (dengan prefix /template/img/product)
          const imgName = `/template/img/product/${Date.now()}_${files.img.name}`;
          const newImgPath = path.join(process.cwd(), 'public', imgName);

          // Pindahkan file ke folder yang diinginkan
          await fs.rename(imgPath, newImgPath);

          const product = await Product.create({ name, price, img: imgName });
          res.status(201).json(product);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}