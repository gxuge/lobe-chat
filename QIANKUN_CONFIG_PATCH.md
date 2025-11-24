/**
 * Qiankun 微前端配置补丁
 *
 * 这是一个最小化、低耦合的配置方案
 * 只在需要时启用，不影响正常运行
 *
 * 使用方法：
 * 1. 将此文件中标记的代码段复制到 next.config.ts
 * 2. 设置环境变量 QIANKUN_MODE=true 即可启用
 * 3. 不设置时，完全不影响现有功能
 */

// ============================================
// 第一步：在 next.config.ts 顶部添加（第 6 行之后）
// ============================================
/*
const isProd = process.env.NODE_ENV === 'production';
const buildWithDocker = process.env.DOCKER === 'true';
const isDesktop = process.env.NEXT_PUBLIC_IS_DESKTOP_APP === '1';
const enableReactScan = !!process.env.REACT_SCAN_MONITOR_API_KEY;
const isUsePglite = process.env.NEXT_PUBLIC_CLIENT_DB === 'pglite';
const shouldUseCSP = process.env.ENABLED_CSP === '1';

// 👇 添加这两行
const isQiankunMode = process.env.QIANKUN_MODE === 'true';
const pkg = require('./package.json');
*/

// ============================================
// 第二步：修改 headers() 函数（约第 52 行）
// ============================================
/*
// 找到这段代码：
  async headers() {
    const securityHeaders = [
      {
        key: 'x-robots-tag',
        value: 'all',
      },
    ];

    if (shouldUseCSP) {
      securityHeaders.push(
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'none';",
        },
      );
    }

// 👇 改为：
  async headers() {
    const securityHeaders = [
      {
        key: 'x-robots-tag',
        value: 'all',
      },
    ];

    // Qiankun 模式下不启用 CSP，允许被嵌入
    if (shouldUseCSP && !isQiankunMode) {
      securityHeaders.push(
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'none';",
        },
      );
    }

    // Qiankun 模式下添加 CORS 支持
    const corsHeaders = isQiankunMode ? [
      {
        key: 'Access-Control-Allow-Origin',
        value: process.env.MAIN_APP_ORIGIN || '*',
      },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,POST,PUT,DELETE,OPTIONS',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value: 'X-Requested-With,content-type,Authorization',
      },
    ] : [];

    return [
      {
        headers: [...securityHeaders, ...corsHeaders],  // 👈 注意这里添加了 ...corsHeaders
        source: '/:path*',
      },
      // ... 其余配置保持不变
*/

// ============================================
// 第三步：修改 webpack() 函数（约第 280 行）
// ============================================
/*
// 找到 webpack(config) 函数，在 return config; 之前添加：

  webpack(config) {
    // ... 原有配置

    // 👇 在 return config; 之前添加
    // Qiankun 微前端支持：配置 UMD 输出
    if (isQiankunMode && !config.isServer) {
      config.output = config.output || {};
      config.output.library = `${pkg.name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.globalObject = 'window';
      config.output.chunkLoadingGlobal = `webpackJsonp_${pkg.name}`;
    }

    return config;
  },
*/

// ============================================
// 完整的最小修改示例
// ============================================

/**
 * 以下是完整的修改后的 next.config.ts 关键部分
 * 只显示需要修改的部分
 */

/*
import analyzer from '@next/bundle-analyzer';
import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';
import ReactComponentName from 'react-scan/react-component-name/webpack';

const isProd = process.env.NODE_ENV === 'production';
const buildWithDocker = process.env.DOCKER === 'true';
const isDesktop = process.env.NEXT_PUBLIC_IS_DESKTOP_APP === '1';
const enableReactScan = !!process.env.REACT_SCAN_MONITOR_API_KEY;
const isUsePglite = process.env.NEXT_PUBLIC_CLIENT_DB === 'pglite';
const shouldUseCSP = process.env.ENABLED_CSP === '1';

// ✅ 添加：Qiankun 支持（低耦合，只在需要时启用）
const isQiankunMode = process.env.QIANKUN_MODE === 'true';
const pkg = require('./package.json');

// ... 中间代码保持不变 ...

const nextConfig: NextConfig = {
  // ... 其他配置 ...

  async headers() {
    const securityHeaders = [
      {
        key: 'x-robots-tag',
        value: 'all',
      },
    ];

    // ✅ 修改：Qiankun 模式下不启用 CSP
    if (shouldUseCSP && !isQiankunMode) {
      securityHeaders.push(
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'Content-Security-Policy',
          value: "frame-ancestors 'none';",
        },
      );
    }

    // ✅ 添加：Qiankun CORS 支持
    const corsHeaders = isQiankunMode ? [
      {
        key: 'Access-Control-Allow-Origin',
        value: process.env.MAIN_APP_ORIGIN || '*',
      },
      {
        key: 'Access-Control-Allow-Methods',
        value: 'GET,POST,PUT,DELETE,OPTIONS',
      },
      {
        key: 'Access-Control-Allow-Headers',
        value: 'X-Requested-With,content-type,Authorization',
      },
    ] : [];

    return [
      {
        headers: [...securityHeaders, ...corsHeaders],  // ✅ 添加 CORS headers
        source: '/:path*',
      },
      // ... 其他 headers 配置保持不变 ...
    ];
  },

  // ... 其他配置 ...

  webpack(config, { isServer }) {
    // ... 原有 webpack 配置 ...

    // ✅ 添加：Qiankun UMD 输出配置
    if (isQiankunMode && !isServer) {
      config.output = config.output || {};
      config.output.library = `${pkg.name}-[name]`;
      config.output.libraryTarget = 'umd';
      config.output.globalObject = 'window';
      config.output.chunkLoadingGlobal = `webpackJsonp_${pkg.name}`;
    }

    return config;
  },
};

export default withBundleAnalyzer(withPWA(nextConfig as NextConfig));
*/

// ============================================
// 使用说明
// ============================================

/**
 * 启用 Qiankun 模式：
 *
 * 1. 在 .env.local 中添加：
 *    QIANKUN_MODE=true
 *    MAIN_APP_ORIGIN=http://localhost:3100  # 主应用的地址
 *
 * 2. 正常启动：
 *    pnpm dev
 *
 * 3. 在主应用中注册：
 *    registerMicroApps([{
 *      name: 'lobechat',
 *      entry: '//localhost:3010',
 *      container: '#container',
 *      activeRule: '/ai/chat',
 *    }])
 *
 * 禁用 Qiankun 模式：
 * - 不设置 QIANKUN_MODE 或设置为 false
 * - 应用将完全按照原有方式运行
 */

// ============================================
// 设计理念：最小化耦合
// ============================================

/**
 * 1. 零依赖入侵
 *    - 不修改任何现有业务代码
 *    - 不引入新的必需依赖
 *    - Qiankun 功能完全可选
 *
 * 2. 条件启用
 *    - 通过环境变量控制
 *    - 默认关闭，不影响现有功能
 *    - 启用时才加载相关逻辑
 *
 * 3. 渐进式集成
 *    - 可以先启用基础功能
 *    - 逐步完善 token 验证、session 等
 *    - 每个功能都是独立的
 *
 * 4. 易于移除
 *    - 所有 Qiankun 相关代码都有明确标记
 *    - 需要移除时，删除标记的代码即可
 *    - 不会留下技术债务
 */
