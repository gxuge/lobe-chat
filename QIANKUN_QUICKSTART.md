# Qiankun Micro-Frontend Quick Start

## ✨ What's Been Done

All core qiankun integration files have been created:

- ✅ Type definitions (`src/types/qiankun.ts`)
- ✅ Lifecycle hooks (`src/qiankun-entry.ts`)
- ✅ Utility functions (`src/utils/qiankun.ts`)
- ✅ External auth API (`src/app/(backend)/api/auth/external-login/route.ts`)
- ✅ Password generator (`src/libs/password/generate.ts`)
- ✅ Public path config (`public-path.js`)

## 🚀 Quick Setup (5 Steps)

### Step 1: Update Next.js Config

Add qiankun support to `next.config.ts`:

```typescript
// Add at top
const isQiankunMode = process.env.QIANKUN_MODE === 'true';
const pkg = require('./package.json');

// In headers() function, add CORS:
async headers() {
  const corsHeaders = isQiankunMode ? [
    { key: 'Access-Control-Allow-Origin', value: '*' },
    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
    { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With,content-type' },
  ] : [];

  return [
    { source: '/:path*', headers: [...securityHeaders, ...corsHeaders] },
    // ... rest
  ];
}

// In webpack() function, add:
if (isQiankunMode && !isServer) {
  config.output.library = `${pkg.name}-[name]`;
  config.output.libraryTarget = 'umd';
  config.output.globalObject = 'window';
}
```

### Step 2: Set Environment Variables

Create `.env.local`:

```env
QIANKUN_MODE=false  # Set to true when testing with main app
NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1
DATABASE_URL=postgresql://user:password@localhost:5432/lobechat
```

### Step 3: Implement Token Verification (CRITICAL)

In `src/app/(backend)/api/auth/external-login/route.ts`, replace the TODO with:

```typescript
// Verify token with main application
const tokenVerification = await fetch('https://your-main-app.com/api/verify-token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token, username }),
});

if (!tokenVerification.ok) {
  return NextResponse.json(
    { error: 'Invalid token', success: false },
    { status: 401 },
  );
}
```

### Step 4: Implement Session Creation (CRITICAL)

In the same file, replace the session TODO with your auth integration:

```typescript
// Example with NextAuth
import { getServerSession } from 'next-auth';
// Create session/JWT for the user
const jwt = signJwt({ userId, username });
response.cookies.set('session', jwt, { httpOnly: true, secure: isProd });
```

### Step 5: Test It

```bash
# Test standalone mode
pnpm dev
# Visit http://localhost:3010

# Test micro-frontend mode
export QIANKUN_MODE=true
pnpm dev
# Configure main app to load from http://localhost:3010
```

## 📘 Main App Configuration

```typescript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'lobechat',
    entry: '//localhost:3010',  // or production URL
    container: '#subapp-container',
    activeRule: '/ai/chat',
    props: {
      userInfo: {
        username: 'user001',
        realname: 'John Doe',
        email: 'john@example.com',
        userId: 'main-user-123',
        token: 'your-jwt-token',
        fromMainApp: true,
      },
      isInMainApp: true,
      onLogin: (data) => console.log('Login success', data),
      onLogout: () => console.log('Logout'),
    },
  },
]);

start({ experimentalStyleIsolation: true });
```

## ✅ Testing Checklist

- [ ] Standalone mode works
- [ ] Loads in main app
- [ ] Auto-login works
- [ ] New users auto-register
- [ ] Styles don't conflict
- [ ] Routing works correctly

## 📚 Full Documentation

See `QIANKUN_SETUP.md` for complete documentation including:
- Detailed configuration
- Security best practices
- Troubleshooting guide
- Production deployment

## ⚠️ Important Notes

**Security**:
- ✅ Token verification is MANDATORY in production
- ✅ Replace CORS `*` with actual main app domain
- ✅ Implement proper session management

**Database** (Optional):
Add external user tracking to schema if needed:
```typescript
externalUserId: text('external_user_id'),
source: text('source'),
```
Then run: `bun run db:generate && bun run db:migrate`

## 🐛 Troubleshooting

**Can't load in main app**:
- Check CORS headers
- Verify `QIANKUN_MODE=true`
- Check webpack UMD output

**Auto-login fails**:
- Verify `/api/auth/external-login` endpoint
- Check token verification logic
- Ensure `NEXT_PUBLIC_ENABLED_SERVER_SERVICE=1`

**Styles conflict**:
- Enable `experimentalStyleIsolation` in main app
- LobeChat already uses CSS-in-JS (antd-style)

---

**Need Help?** Check `QIANKUN_SETUP.md` for detailed documentation.
