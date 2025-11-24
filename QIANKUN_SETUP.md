# LobeChat 微前端集成配置指南

本文档提供了将 LobeChat 配置为 qiankun 微前端子应用的完整指南。

## 📋 目录

1. [概述](#概述)
2. [已完成的配置](#已完成的配置)
3. [需要手动完成的配置](#需要手动完成的配置)
4. [使用方法](#使用方法)
5. [测试验证](#测试验证)
6. [常见问题](#常见问题)

## 概述

### 功能特性

✅ **双模式支持**：
- 独立运行模式：使用自己的登录系统
- 嵌入运行模式：使用主应用传递的登录信息

✅ **自动登录和注册**：
- 主应用用户首次访问自动注册
- 自动使用主应用 token 完成登录
- 无需用户再次输入密码

✅ **数据独立**：
- 主应用和子应用的用户数据互不干扰
- 子应用有独立的数据库和用户系统

## 已完成的配置

### 1. 依赖安装

```bash
pnpm add vite-plugin-qiankun
```

### 2. 文件结构

已创建以下文件：

```
lobe-chat/
├── public/
│   └── qiankun-entry.js                    # Qiankun 入口脚本（修复 Next.js 兼容性）
├── src/
│   ├── qiankun-entry.ts                    # Qiankun 生命周期钩子（已废弃，使用 public/qiankun-entry.js）
│   ├── types/qiankun.ts                    # TypeScript 类型定义
│   ├── utils/qiankun.ts                    # Qiankun 工具函数
│   ├── libs/password/generate.ts           # 随机密码生成器
│   ├── app/[variants]/layout.tsx           # 已集成 qiankun 入口脚本加载
│   └── app/(backend)/api/auth/
│       └── external-login/route.ts         # 外部认证 API
```

### 3. 核心功能

#### 3.1 类型定义 (`src/types/qiankun.ts`)

定义了主应用传递的数据结构：

```typescript
interface QiankunProps {
  userInfo: {
    username: string;
    realname: string;
    avatar?: string;
    email?: string;
    phone?: string;
    userId: string;
    token: string;
    fromMainApp: boolean;
    tenantId?: string | number;
  } | null;
  isInMainApp: boolean;
  basePath?: string;
  onLogin?: (data: any) => void;
  onLogout?: () => void;
  actions?: any;
}
```

#### 3.2 生命周期钩子 (`public/qiankun-entry.js`)

实现了 qiankun 的四个主要生命周期，并修复了 Next.js 在 qiankun 环境下的兼容性问题：

- `bootstrap()`: 初始化
- `mount(props)`: 挂载，并处理自动登录
- `unmount()`: 卸载
- `update(props)`: 更新

**关键修复**：
1. **document.currentScript polyfill**: 修复 Next.js chunk 加载时的 `Cannot read properties of null` 错误
2. **webpack public path**: 自动设置 qiankun 注入的公共路径
3. **早期注册**: 在 HTML 加载最早期注册生命周期函数，确保 qiankun 能正确识别

#### 3.3 外部认证 API (`src/app/(backend)/api/auth/external-login/route.ts`)

处理主应用用户的自动登录和注册：

```typescript
POST /api/auth/external-login
{
  "username": "string",
  "token": "string",
  "externalAuth": true,
  "userInfo": {
    "realname": "string",
    "email": "string",
    "avatar": "string",
    "phone": "string",
    "userId": "string"
  }
}
```

#### 3.4 工具函数 (`src/utils/qiankun.ts`)

提供了便捷的工具函数：

```typescript
isQiankunApp(): boolean              // 检测是否在 qiankun 环境中
getQiankunProps(): QiankunProps      // 获取主应用传递的 props
isMainAppUser(): boolean             // 检查是否是主应用用户
getMainAppUserInfo()                 // 获取主应用用户信息
notifyMainAppLogin(data)             // 通知主应用登录成功
notifyMainAppLogout()                // 通知主应用登出
```

## 需要手动完成的配置

### 1. Next.js 配置修改 ✅ 已完成

`next.config.ts` 已经配置完成，包含以下关键配置：

```typescript
// 已添加的配置
const isQiankunMode = process.env.QIANKUN_MODE === 'true';
const pkg = require('./package.json');

// CORS 支持（已配置）
async headers() {
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
  // ...
}

// UMD 配置（已配置）
webpack(config, { isServer }) {
  // ...
  if (isQiankunMode && !isServer) {
    console.log('[Qiankun] Configuring webpack for micro-frontend mode');

    config.output = config.output || {};
    config.output.library = `${pkg.name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.globalObject = 'window';
    config.output.chunkLoadingGlobal = `webpackJsonp_${pkg.name}`;
    config.output.publicPath = 'auto';
  }
  // ...
}
```

**注意**：生产环境请修改 `MAIN_APP_ORIGIN` 为实际的主应用域名。

### 2. 数据库 Schema 扩展（可选）

如需存储外部用户 ID 和来源，可以扩展 `packages/database/src/schemas/users.ts`：

```typescript
// 添加字段
externalUserId: text('external_user_id'),  // 主应用用户 ID
source: text('source'),                      // 用户来源：'main_app', 'local', etc.
```

然后运行数据库迁移：

```bash
bun run db:generate
bun run db:migrate
```

### 3. 环境变量配置

创建或更新 `.env.local`：

```env
# Qiankun 模式（开发时设置为 true）
QIANKUN_MODE=false

# 启用服务器模式（必须）
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1

# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/lobechat
```

### 4. Token 验证（重要）

在 `src/app/(backend)/api/auth/external-login/route.ts` 中，找到以下注释：

```typescript
// TODO: Verify token with main application
// In production, you should validate the token by calling main app's API
```

**必须实现 token 验证逻辑**：

```typescript
// 示例：调用主应用 API 验证 token
const isValidToken = await fetch('https://main-app.com/api/verify-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, username }),
});

if (!isValidToken.ok) {
  return NextResponse.json(
    { error: 'Invalid or expired token', success: false },
    { status: 401 },
  );
}
```

### 5. Session/JWT 集成（重要）

在 `external-login/route.ts` 中，找到以下注释：

```typescript
// TODO: Create session/JWT token for the user
// In production, you should integrate with your auth system
```

**必须集成认证系统**：

示例（使用 NextAuth）：

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/(backend)/api/auth/[...nextauth]/route';

// 创建 session
const session = await getServerSession(authOptions);
// 或使用 JWT
const jwt = signJwt({ userId, username });

// 设置 cookie
response.cookies.set('session', jwt, {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7, // 7 days
});
```

## 使用方法

### 开发环境

#### 1. 独立运行模式

```bash
# 不设置 QIANKUN_MODE，正常启动
pnpm dev
# 访问 http://localhost:3010
```

#### 2. 微前端模式（配合主应用）

```bash
# 设置环境变量
export QIANKUN_MODE=true
pnpm dev
# 子应用运行在 http://localhost:3010
```

### 主应用配置

在主应用中注册子应用：

```typescript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'lobechat',
    entry: '//localhost:3010',
    container: '#subapp-container',
    activeRule: '/ai/chat',
    props: {
      userInfo: {
        username: 'user001',
        realname: '张三',
        email: 'zhangsan@example.com',
        userId: 'main-user-123',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        fromMainApp: true,
      },
      isInMainApp: true,
      basePath: '/ai/chat',
      onLogin: (data) => {
        console.log('子应用登录成功:', data);
      },
      onLogout: () => {
        console.log('子应用登出');
      },
    },
  },
]);

start({
  experimentalStyleIsolation: true,
});
```

### 生产环境

```bash
# 构建子应用
export QIANKUN_MODE=true
export NODE_ENV=production
pnpm build

# 启动
pnpm start
```

## 测试验证

### 测试清单

- [ ] **独立运行**：子应用可以独立启动和访问
- [ ] **主应用加载**：子应用可以在主应用中正常加载
- [ ] **自动登录**：主应用用户访问子应用时自动登录
- [ ] **自动注册**：新用户自动注册并登录
- [ ] **数据隔离**：主应用和子应用数据互不干扰
- [ ] **样式隔离**：样式不会相互影响
- [ ] **路由正常**：子应用路由在主应用中正常工作
- [ ] **通信正常**：子应用可以通知主应用登录/登出事件

### 测试脚本

#### 1. 测试独立运行

```bash
# 启动子应用
pnpm dev

# 访问 http://localhost:3010
# 预期：能正常访问和使用
```

#### 2. 测试自动登录

```bash
# 启动子应用（微前端模式）
export QIANKUN_MODE=true
pnpm dev

# 在主应用中访问
# 预期：
# 1. 控制台输出 "[LobeChat MicroApp] mount"
# 2. 自动调用 /api/auth/external-login
# 3. 登录成功后调用 props.onLogin
```

#### 3. 测试 API

```bash
# 使用 curl 测试外部登录 API
curl -X POST http://localhost:3010/api/auth/external-login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "token": "test-token-123",
    "externalAuth": true,
    "userInfo": {
      "realname": "测试用户",
      "email": "test@example.com",
      "userId": "main-123"
    }
  }'

# 预期响应：
# {
#   "success": true,
#   "message": "User registered and logged in",
#   "userId": "...",
#   "username": "testuser"
# }
```

## 常见问题

### Q1: 生命周期函数找不到 ✅ 已修复

**症状**：
```
[qiankun] lifecycle not found from @lobehub/chat entry exports,
fallback to get from window['@lobehub/chat']
QiankunError: You need to export lifecycle functions in @lobehub/chat entry
```

**原因**：Next.js 不支持直接从 webpack 入口导出 UMD 生命周期函数。

**解决方案**（已实施）：
1. 创建 `public/qiankun-entry.js` 文件，在其中注册生命周期函数到 `window['@lobehub/chat']`
2. 在 `src/app/[variants]/layout.tsx` 的 `<head>` 中最早加载此脚本
3. 确保 `QIANKUN_MODE=true` 时才加载此脚本

### Q2: Next.js chunk 加载错误 ✅ 已修复

**症状**：
```
Cannot read properties of null (reading 'getAttribute')
at getPathFromScript (runtime-base.ts:328:19)
```

**原因**：Next.js 运行时代码尝试通过 `document.currentScript` 获取脚本路径，但在 qiankun 沙箱中此值为 `null`。

**解决方案**（已实施）：
在 `public/qiankun-entry.js` 中添加了 `document.currentScript` 的 polyfill：

```javascript
Object.defineProperty(document, 'currentScript', {
  get: function() {
    // 返回 mock script 元素，防止 Next.js 崩溃
    const mockScript = document.createElement('script');
    mockScript.src = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || window.location.origin;
    return mockScript;
  }
});
```

### Q3: 子应用无法在主应用中加载

**症状**：主应用报错 "application 'lobechat' died in status LOADING_SOURCE_CODE"

**解决方案**：

1. 检查 CORS 配置是否正确
2. 确认 `QIANKUN_MODE=true` 已设置
3. 检查 webpack 配置中的 UMD 输出是否正确
4. 查看浏览器控制台是否有跨域错误
5. 确认 `public/qiankun-entry.js` 文件存在且可访问

### Q2: 样式冲突

**症状**：主应用和子应用样式相互影响

**解决方案**：

1. 主应用启用 `experimentalStyleIsolation: true`
2. 使用 CSS Modules 或 CSS-in-JS（LobeChat 已使用 antd-style）
3. 避免使用全局样式选择器

### Q5: 路由冲突

**症状**：子应用路由在主应用中不工作

**解决方案**：

1. 确保子应用使用相对路径
2. 使用 `basePath` 配置（从 props 获取）
3. 确保主应用的 `activeRule` 和子应用路由匹配

### Q6: 自动登录失败

**症状**：用户没有自动登录

**解决方案**：

1. 检查主应用是否正确传递了 `userInfo`
2. 查看浏览器 Network 面板，确认 `/api/auth/external-login` 请求是否成功
3. 检查服务器日志，查看错误信息
4. 确认 `NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1` 已设置
5. 验证 token 验证逻辑是否正确实现

### Q7: 数据库错误

**症状**："注册功能需要启用服务器模式"

**解决方案**：

1. 确认 `.env.local` 中设置了 `NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1`
2. 确认数据库连接字符串正确
3. 运行数据库迁移：`bun run db:migrate`

### Q8: TypeScript 类型错误

**症状**：导入 qiankun 相关模块时类型报错

**解决方案**：

1. 确认 `src/types/qiankun.ts` 文件存在
2. 在 `tsconfig.json` 中确认 `src/types` 包含在编译路径中
3. 重启 TypeScript 服务器

## 安全注意事项

⚠️ **重要**：以下配置必须在生产环境中实现：

1. **Token 验证**：
   - 必须验证主应用传递的 token
   - 建议调用主应用的 token 验证 API
   - 不要直接信任前端传递的任何数据

2. **CORS 配置**：
   - 生产环境不要使用 `Access-Control-Allow-Origin: *`
   - 应该设置为主应用的具体域名

3. **Session 管理**：
   - 必须正确实现 session/JWT 创建
   - 使用 HttpOnly cookies
   - 设置合适的过期时间

4. **密码安全**：
   - 自动注册时生成的随机密码已使用 bcrypt 加密
   - 用户不需要知道这个密码

5. **用户数据**：
   - 建议添加 `externalUserId` 字段关联主应用用户
   - 定期清理无效的外部用户

## 后续优化建议

1. **监控和日志**：
   - 添加自动登录成功/失败的监控
   - 记录外部认证请求日志

2. **性能优化**：
   - 实现 token 缓存机制
   - 优化首次加载速度

3. **用户体验**：
   - 添加登录loading状态
   - 实现登录失败的友好提示
   - 支持手动重试登录

4. **数据同步**：
   - 实现用户信息定期同步
   - 支持主应用用户信息更新通知

## 参考资料

- [qiankun 官方文档](https://qiankun.umijs.org/zh)
- [Next.js 配置文档](https://nextjs.org/docs/app/api-reference/next-config-js)
- [LobeChat GitHub](https://github.com/lobehub/lobe-chat)

## 技术支持

如有问题，请：

1. 查看本文档的「常见问题」章节
2. 检查浏览器控制台和服务器日志
3. 提交 Issue 到 GitHub（包含详细的错误信息和复现步骤）

---

**配置完成时间**: 2025-01-21
**文档版本**: 2.0.0
**作者**: Claude

## 更新日志

### v2.0.0 (2025-01-21)
- ✅ 修复：生命周期函数找不到的问题
- ✅ 修复：Next.js chunk 加载时的 `document.currentScript` 错误
- ✅ 新增：`public/qiankun-entry.js` 入口脚本
- ✅ 优化：移除不再需要的 `QiankunLifecycle` React 组件
- ✅ 完善：webpack 配置添加 `publicPath: 'auto'`
- ✅ 完善：更新文档，添加已修复问题的说明

### v1.0.0 (2025-01-XX)
- 初始版本
