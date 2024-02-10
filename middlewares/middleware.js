import { NextResponse } from "next/server";

// the list of all allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://alert-lionfish-partly.ngrok-free.app/',
];

export function middleware(req) {
    const res = NextResponse.next()

    req.headers.get("origin")

    if (allowedOrigins.includes(origin)) {
      res.headers.append('Access-Control-Allow-Origin', origin);
    }

    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/api/:path*',
}