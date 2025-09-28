/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出模式 - 适配 Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // 禁用图片优化（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  // 环境变量配置
  env: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'LunaTV',
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || '/api',
  },
  
  // 资源路径配置
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  
  // 禁用一些服务器端功能
  experimental: {
    images: {
      unoptimized: true
    }
  },
  
  // 由于是静态导出，需要禁用这些功能
  swcMinify: true,
}

module.exports = nextConfig
