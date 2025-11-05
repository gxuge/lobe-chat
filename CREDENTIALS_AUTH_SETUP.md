# 账号密码登录功能使用指南

本指南说明如何启用和使用 NextAuth 的账号密码登录功能。

## 功能概述

现在 LobeChat 支持以下登录方式：

1. **SSO 登录**（OAuth/OIDC）- 如 Keycloak、GitHub、Google 等
2. **账号密码登录**（Credentials）- 使用邮箱和密码 ✨ 新增

## 安装依赖

首先需要安装密码加密库：

```bash
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

## 数据库迁移

运行数据库迁移以添加密码字段：

```bash
# 如果使用 PGLite
bun run migration:pglite

# 如果使用 PostgreSQL
bun run migration:postgres
```

迁移文件位置：`packages/database/migrations/0039_add_password_hash.sql`

## 环境变量配置

在你的 `.env` 或 `docker-compose.yml` 中配置：

```env
# 必须启用 NextAuth
NEXT_PUBLIC_ENABLE_NEXT_AUTH=1
NEXT_PUBLIC_ENABLE_CLERK_AUTH=0

# 必须启用服务器模式（账号密码登录需要数据库）
NEXT_PUBLIC_SERVICE_MODE=server

# NextAuth 配置
NEXT_AUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com/api/auth

# SSO Providers 列表（添加 credentials）
NEXT_AUTH_SSO_PROVIDERS=keycloak,credentials

# 可选：同时保留其他 SSO Provider
# NEXT_AUTH_SSO_PROVIDERS=keycloak,github,google,credentials
```

## 使用方式

### 访问登录页面

```
https://your-domain.com/next-auth/signin
```

登录页面会自动显示：

- **SSO 登录** Tab（如果配置了 SSO Providers）
- **账号密码** Tab（如果启用了 credentials）

### 用户注册

1. 访问注册页面：

```
https://your-domain.com/next-auth/signup
```

2. 填写注册信息：
   - 邮箱（必填）
   - 用户名（可选）
   - 密码（必填，至少 8 位，包含字母和数字）
   - 确认密码（必填）

3. 注册成功后会自动登录

### 用户登录

1. 在登录页面选择 **账号密码** Tab
2. 输入邮箱和密码
3. 点击登录

### 密码要求

- 长度：至少 8 位，不超过 100 位
- 必须包含字母和数字
- 使用 bcrypt 加密存储（安全级别：10）

## 文件结构

```
src/
├── libs/
│   ├── password/
│   │   └── index.ts                          # 密码加密和验证工具
│   └── next-auth/
│       └── sso-providers/
│           ├── credentials.ts                 # Credentials Provider
│           └── index.ts                       # Provider 列表
├── app/
│   ├── (backend)/
│   │   └── api/
│   │       └── auth/
│   │           └── signup/
│   │               └── route.ts               # 用户注册 API
│   └── [variants]/
│       └── (auth)/
│           └── next-auth/
│               ├── signin/
│               │   ├── AuthSignInBox.tsx      # 登录页面（支持多 Tab）
│               │   └── CredentialsForm.tsx    # 账号密码登录表单
│               └── signup/
│                   ├── page.tsx               # 注册页面路由
│                   ├── SignupBox.tsx          # 注册页面容器
│                   └── SignupForm.tsx         # 注册表单
packages/
└── database/
    ├── migrations/
    │   └── 0039_add_password_hash.sql         # 数据库迁移
    └── src/
        └── schemas/
            └── user.ts                        # 用户表 Schema（含 passwordHash 字段）
```

## API 接口

### 注册 API

**POST** `/api/auth/signup`

请求体：

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "用户名（可选）"
}
```

响应：

```json
{
  "message": "注册成功",
  "success": true,
  "userId": "xxx-xxx-xxx"
}
```

### 登录 API

使用 NextAuth 的标准登录接口：

```typescript
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  email: 'user@example.com',
  password: 'password123',
  redirectTo: '/',
});
```

## 安全特性

1. **密码加密**：使用 bcrypt 加密，salt rounds = 10
2. **密码验证**：登录时验证密码强度
3. **错误提示**：统一的错误信息，防止用户枚举
4. **Session 管理**：使用 NextAuth JWT 或 Database Session
5. **自动绑定**：支持同一邮箱多种登录方式（SSO + 账号密码）

## 与 SSO 共存

账号密码登录可以与 SSO 登录完美共存：

```env
# 同时启用多种登录方式
NEXT_AUTH_SSO_PROVIDERS=keycloak,github,google,credentials
```

用户可以：

- 使用 SSO 登录（GitHub、Keycloak 等）
- 使用账号密码登录
- 同一个邮箱可以绑定多种登录方式

数据库 `nextauth_accounts` 表会记录所有登录方式：

```sql
provider           | providerAccountId
-------------------|-----------------
keycloak          | external-id-123
credentials       | user@example.com
github            | github-user-456
```

## 常见问题

### Q: 忘记密码怎么办？

A: 当前版本未实现密码重置功能。后续可以添加：

- 邮件重置密码
- 管理员重置密码

### Q: 可以修改密码吗？

A: 当前版本未实现密码修改功能。后续可以在用户设置中添加。

### Q: 是否支持第三方邮件服务？

A: 注册功能不发送邮件。如需邮箱验证，可以集成：

- SendGrid
- AWS SES
- 阿里云邮件服务

### Q: 如何只启用账号密码登录？

A: 在环境变量中只配置 credentials：

```env
NEXT_AUTH_SSO_PROVIDERS=credentials
```

### Q: 密码存储安全吗？

A: 是的。密码使用 bcrypt 加密，即使数据库泄露，攻击者也无法直接获取明文密码。

## 后续扩展

可以在此基础上添加：

1. **邮箱验证**：注册时发送验证邮件
2. **密码重置**：忘记密码功能
3. **密码修改**：用户自助修改密码
4. **手机验证码登录**：添加 Phone SMS Provider
5. **双因素认证**：增强安全性
6. **登录日志**：记录登录历史

## 技术栈

- **认证框架**：NextAuth v5 (Auth.js)
- **密码加密**：bcryptjs
- **数据库**：PostgreSQL / PGLite
- **ORM**：Drizzle ORM
- **UI 框架**：React 19 + Ant Design
- **类型安全**：TypeScript

## 相关文档

- [NextAuth 官方文档](https://authjs.dev/)
- [Credentials Provider 文档](https://authjs.dev/getting-started/providers/credentials)
- [bcrypt 文档](https://github.com/kelektiv/node.bcrypt.js)

## 支持

如有问题，请提交 Issue 或查看项目文档。
