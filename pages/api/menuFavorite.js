// pages/api/menuFavorite.js
import dbConnect from "../../config/database";
import OrderProduct from "../../models/orderProduct";
import Product from "../../models/product";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch the top 3 most ordered products
      const orderProducts = await OrderProduct.findAll();
      const productCountMap = new Map();

      orderProducts.forEach((orderProduct) => {
        const productId = orderProduct.productId;
        const count = productCountMap.get(productId) || 0;
        productCountMap.set(productId, count + orderProduct.quantity);
      });

      const sortedProducts = Array.from(productCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([productId]) => productId);

      const top3Products = sortedProducts.slice(0, 4);

      // Fetch product details (including images) for the top 3 most ordered products
      const favoriteProducts = await Product.findAll({
        where: { id: top3Products },
      });

      res.status(200).json(favoriteProducts);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
