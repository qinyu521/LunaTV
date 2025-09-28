/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出模式
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  
  // 图片优化关闭
  images: {
    unoptimized: true,
  },
  
  // 环境变量
  env: {
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'LunaTV',
  },
  
  // 禁用服务器端功能（因为要静态导出）
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
