# Qiankun Micro-Frontend Configuration

## Sub-App Configuration (LobeChat)

### 1. Environment Variables

**File**: `.env local`

```env
QIANKUN_MODE=true
MAIN_APP_ORIGIN=http://localhost:3100
```

### 2. App Name

**App Name**: `lobehub-chat` (changed from `@lobehub/chat`)

### 3. Key Files and Locations

#### 3.1 Qiankun Entry Point

**File**: `public/qiankun-entry.js` (line 14)

```javascript
const appName = 'lobehub-chat';

window[appName] = {
  bootstrap: async function () { /* ... */ },
  mount: async function (props) { /* ... */ },
  unmount: async function () { /* ... */ },
  update: async function (props) { /* ... */ }
};
```

**Purpose**: Register lifecycle functions to `window['lobehub-chat']` before Next.js loads

#### 3.2 Layout Integration

**File**: `src/app/[variants]/layout.tsx`

- Line ~30: Load qiankun-entry.js script in `<head>`
- Line ~50: Render `<QiankunAutoLogin />` component

```tsx
<head>
  {isQiankunMode && <script src="/qiankun-entry.js" />}
</head>
<body>
  <AuthProvider>
    {isQiankunMode && <QiankunAutoLogin />}
    {children}
  </AuthProvider>
</body>
```

#### 3.3 Auto-Login Component

**File**: `src/components/QiankunAutoLogin.tsx`

**Flow**:
1. Check if running in qiankun environment (`window.__POWERED_BY_QIANKUN__`)
2. Get user info from `window.__QIANKUN_PROPS__`
3. Call `/api/auth/external-login` to register/verify user
4. Sign in with NextAuth using `signIn('credentials')`
5. Navigate to `/chat` using Next.js router

#### 3.4 External Login API

**File**: `src/app/(backend)/api/auth/external-login/route.ts`

**Purpose**: Register or verify external users from main app

**Response**:
```json
{
  "success": true,
  "userId": "xxx",
  "username": "xxx",
  "needsClientSignIn": true
}
```

#### 3.5 Credentials Verification API

**File**: `src/app/(backend)/api/auth/verify-credentials/route.ts`

**Key Logic** (line 35-86):
- Detects external auth by token length (`password.length > 50`)
- For external auth: finds user by username, skips password verification
- For regular auth: verifies password hash

#### 3.6 NextAuth Credentials Provider

**File**: `src/libs/next-auth/sso-providers/credentials.ts`

**Purpose**: Calls `/api/auth/verify-credentials` to authenticate users

#### 3.7 Webpack Configuration

**File**: `next.config.ts`

**Key Sections**:
- CORS headers for cross-origin requests
- Webpack UMD output configuration
- Public path set to `'auto'`

#### 3.8 Type Definitions

**File**: `src/types/qiankun.ts`

**Interfaces**:
- `QiankunProps`: Main app props passed to sub-app
- `ExternalAuthResponse`: External login API response

---

## Main App Configuration (Required Changes)

### Update Micro-App Registration

**Change app name from `@lobehub/chat` to `lobehub-chat`**:

```javascript
// Before
{
  name: '@lobehub/chat',
  entry: 'http://localhost:3010',
  container: '#subapp-viewport',
  activeRule: '/chat'
}

// After
{
  name: 'lobehub-chat',  // ← Changed
  entry: 'http://localhost:3010',
  container: '#subapp-viewport',
  activeRule: '/chat'
}
```

### Pass User Info in Props

```javascript
{
  isInMainApp: true,
  userInfo: {
    username: 'user123',
    token: 'jwt-token-from-main-app',
    fromMainApp: true,
    realname: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://...',
    phone: '1234567890',
    userId: 'main-app-user-id'
  },
  onLogin: (result) => {
    console.log('Sub-app login result:', result);
  }
}
```

---

## Auto-Login Flow

```
1. Main App loads sub-app
   ↓
2. qiankun calls window['lobehub-chat'].mount(props)
   ↓
3. props stored in window.__QIANKUN_PROPS__
   ↓
4. QiankunAutoLogin component detects qiankun environment
   ↓
5. Calls /api/auth/external-login with username + token
   ↓
6. API registers/verifies user in database
   ↓
7. Component calls signIn('credentials', { email: username, password: token })
   ↓
8. Credentials provider calls /api/auth/verify-credentials
   ↓
9. API detects external auth (token length > 50)
   ↓
10. API finds user by username, skips password check
    ↓
11. NextAuth creates session
    ↓
12. router.push('/chat') navigates to chat page
```

---

## Testing Checklist

### Console Logs to Verify

**Sub-app console should show**:
```
[LobeChat] Initializing qiankun micro-frontend mode
[LobeChat] document.currentScript patched
[LobeChat] Lifecycle functions registered to window["lobehub-chat"]
[LobeChat] qiankun bootstrap
[LobeChat] qiankun mount start {isInMainApp: true, userInfo: {...}}
[LobeChat] qiankun mount complete
[QiankunAutoLogin] Attempting auto-login for: user123
[QiankunAutoLogin] User verified, signing in with NextAuth
[QiankunAutoLogin] Sign in successful, redirecting to /chat
```

### Expected Behavior

1. ✅ Sub-app loads without "lifecycle not found" error
2. ✅ No "Cannot read properties of null" errors
3. ✅ Auto-login completes within 2-3 seconds
4. ✅ User redirected to `/chat` page
5. ✅ CSS styles applied correctly
6. ✅ User session persists on page refresh

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "lifecycle not found" | Main app using wrong app name | Change to `'lobehub-chat'` |
| Mount timeout | Blocking await in mount | Already fixed (moved to React component) |
| No navigation | Using window.location | Already fixed (using Next.js router) |
| CSS not loading | Missing style isolation | Main app should use `experimentalStyleIsolation: true` |
| API 404 errors | Wrong origin | Already fixed (using `__INJECTED_PUBLIC_PATH_BY_QIANKUN__`) |

---

## File Summary

| File | Purpose | Key Changes |
|------|---------|-------------|
| `public/qiankun-entry.js` | Lifecycle registration | App name: `'lobehub-chat'` |
| `src/app/[variants]/layout.tsx` | Load entry script + auto-login | Added script tag + QiankunAutoLogin |
| `src/components/QiankunAutoLogin.tsx` | NextAuth integration | Complete auto-login flow |
| `src/app/(backend)/api/auth/external-login/route.ts` | User registration | Returns `needsClientSignIn: true` |
| `src/app/(backend)/api/auth/verify-credentials/route.ts` | Auth verification | Supports external auth tokens |
| `next.config.ts` | Webpack + CORS | UMD output + CORS headers |
| `.env local` | Environment | `QIANKUN_MODE=true` |

---

## Next Steps

1. **Update main app**: Change app name to `'lobehub-chat'`
2. **Restart sub-app**: Ensure `QIANKUN_MODE=true` is set
3. **Test in browser**: Verify console logs and auto-login flow
4. **Check CSS**: Ensure styles load correctly in qiankun sandbox
