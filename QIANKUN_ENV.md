# LobeChat Qiankun 微前端环境变量配置

## 🎯 快速开始

### 默认模式（独立运行）

**无需任何配置**，应用将以独立模式运行，完全不受 qiankun 影响。

```bash
pnpm dev
# 访问 http://localhost:3010
```

### 微前端模式（嵌入主应用）

在 `.env.local` 中添加：

```env
# 启用 qiankun 微前端模式
QIANKUN_MODE=true

# 主应用地址（用于 CORS，生产环境必须设置为实际域名）
MAIN_APP_ORIGIN=http://localhost:3100

# 启用服务器模式（外部认证必需）
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1

# 数据库连接（外部认证必需）
DATABASE_URL=postgresql://user:password@localhost:5432/lobechat
```

然后正常启动：

```bash
pnpm dev
# 子应用运行在 http://localhost:3010
```

---

## 📋 环境变量详解

### QIANKUN_MODE

**控制是否启用 qiankun 微前端功能**

- **类型**: `boolean` (string)
- **默认值**: `undefined` (等同于 `false`)
- **可选值**: `'true'` | `'false'` | 不设置

**影响范围**:
- ✅ 启用 (`true`) 时:
  - 放宽 CSP 限制，允许被 iframe 嵌入
  - 添加 CORS 响应头
  - Webpack 输出 UMD 格式
  - 支持 qiankun 生命周期

- ❌ 关闭 (`false` 或不设置) 时:
  - 完全独立运行
  - 保持原有安全策略
  - 不影响任何现有功能

**使用示例**:

```env
# 启用微前端
QIANKUN_MODE=true

# 禁用微前端（可省略）
QIANKUN_MODE=false

# 或者直接不设置这个变量（默认禁用）
```

---

### MAIN_APP_ORIGIN

**主应用的完整域名地址**（仅在 `QIANKUN_MODE=true` 时生效）

- **类型**: `string` (URL)
- **默认值**: `'*'` (开发环境可用，生产环境**不安全**)
- **用途**: 配置 CORS 的 `Access-Control-Allow-Origin` 响应头

**重要**:
- 🚨 生产环境**必须**设置为主应用的实际域名
- ⚠️ 不要在生产环境使用 `*`，会导致安全风险

**使用示例**:

```env
# 开发环境
MAIN_APP_ORIGIN=http://localhost:3100

# 测试环境
MAIN_APP_ORIGIN=https://test.your-main-app.com

# 生产环境
MAIN_APP_ORIGIN=https://your-main-app.com
```

---

### NEXT_PUBLIC_ENABLED_SERVER_SERVICE

**启用服务器模式**（外部认证 API 必需）

- **类型**: `boolean` (string)
- **默认值**: `undefined`
- **必需**: 是（如果需要外部认证功能）

**说明**:
- 外部认证 API (`/api/auth/external-login`) 需要访问服务器端数据库
- 必须设置为 `1` 才能使用自动登录和注册功能

```env
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1
```

---

### DATABASE_URL

**PostgreSQL 数据库连接字符串**

- **类型**: `string` (connection string)
- **格式**: `postgresql://username:password@host:port/database`
- **必需**: 是（如果 `NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1`）

**使用示例**:

```env
# 本地开发
DATABASE_URL=postgresql://postgres:password@localhost:5432/lobechat

# Docker
DATABASE_URL=postgresql://postgres:password@db:5432/lobechat

# 远程数据库
DATABASE_URL=postgresql://user:pass@remote-host.com:5432/lobechat
```

---

## 🔧 配置示例

### 场景一：完全独立运行（默认）

`.env.local` **不需要**添加任何 qiankun 相关配置：

```env
# 只需要常规的 LobeChat 配置
# QIANKUN_MODE 不设置或设为 false
```

### 场景二：开发环境微前端

`.env.local`:

```env
# Qiankun 配置
QIANKUN_MODE=true
MAIN_APP_ORIGIN=http://localhost:3100

# 服务器模式
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1
DATABASE_URL=postgresql://postgres:password@localhost:5432/lobechat
```

### 场景三：生产环境微前端

`.env.production` 或通过环境变量注入：

```env
# Qiankun 配置
QIANKUN_MODE=true
MAIN_APP_ORIGIN=https://your-main-app.com  # ⚠️ 必须设置为实际域名

# 服务器模式
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1
DATABASE_URL=postgresql://user:pass@prod-db:5432/lobechat

# 其他生产环境配置
NODE_ENV=production
```

---

## ✅ 验证配置

启动应用后，查看控制台输出：

### 独立模式（QIANKUN_MODE 未启用）
```
✓ Ready in 2.5s
○ Local:   http://localhost:3010
```

### 微前端模式（QIANKUN_MODE=true）
```
✓ Ready in 2.5s
○ Local:   http://localhost:3010
✓ Qiankun mode enabled
✓ CORS origin: http://localhost:3100
```

---

## 🔍 常见问题

### Q1: 设置 QIANKUN_MODE=true 后无法独立访问？

**A**: QIANKUN_MODE 不影响独立访问，应用仍可以直接通过 `http://localhost:3010` 访问。如果遇到问题，请检查:
- 数据库连接是否正常
- `NEXT_PUBLIC_ENABLED_SERVER_SERVICE` 是否正确设置

### Q2: 生产环境 CORS 错误？

**A**: 确保设置了正确的 `MAIN_APP_ORIGIN`：

```env
# ❌ 错误（生产环境不安全）
MAIN_APP_ORIGIN=*

# ✅ 正确
MAIN_APP_ORIGIN=https://your-main-app.com
```

### Q3: 如何临时禁用微前端功能？

**A**: 三种方法：

```bash
# 方法 1: 注释掉环境变量
# QIANKUN_MODE=true

# 方法 2: 设置为 false
QIANKUN_MODE=false

# 方法 3: 使用不同的 .env 文件
mv .env.local .env.local.qiankun
```

### Q4: 需要重启应用吗？

**A**: 是的，修改环境变量后需要重启：

```bash
# 停止当前应用 (Ctrl+C)
# 重新启动
pnpm dev
```

---

## 📚 相关文档

- 完整配置指南: `QIANKUN_SETUP.md`
- 快速开始: `QIANKUN_QUICKSTART.md`
- 配置补丁说明: `QIANKUN_CONFIG_PATCH.md`

---

**最后更新**: 2025-01
