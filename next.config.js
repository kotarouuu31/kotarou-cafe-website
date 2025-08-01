/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com', // Notion画像ホスト
      's3.us-west-2.amazonaws.com', // Notion画像ホスト（代替）
      'www.notion.so', // Notion画像ホスト（代替）
    ],
  },
}

module.exports = nextConfig
