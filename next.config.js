/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_CONNECTION: process.env.DB_CONNECTION,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
  images: {
    domains: ['ichef.bbci.co.uk'],
  },
}

module.exports = nextConfig;