interface Order {
  id: number;
  customerName: string;
  totalPrice: number;
}

interface OrderProduct {
  id: number;
  orderId: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export type { Order, OrderProduct };
