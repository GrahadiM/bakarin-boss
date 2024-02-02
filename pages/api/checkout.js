import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

let snap = new Midtrans.Snap({
  isProduction: false,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function POST(request) {
  const parameter = await request.json();
  console.log(parameter);

  const token = await snap.createTransactionToken(parameter);
  console.log(token);
  return NextResponse.json({ token });
}
