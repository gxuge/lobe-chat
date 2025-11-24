/**
 * Simple JWT-based session helper for external authentication
 * Low-coupling implementation without depending on NextAuth or Clerk
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'lobechat-qiankun-secret-change-in-production',
);

const SESSION_COOKIE_NAME = 'lobechat-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  exp?: number;
  externalUserId?: string;
  iat?: number;
  source?: string;
  userId: string;
  username: string;
}

/**
 * Create a JWT session token
 */
export async function createSession(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Validate required fields exist in the payload
    const data = payload as Record<string, unknown>;
    if (typeof data.userId !== 'string' || typeof data.username !== 'string') {
      return null;
    }

    return {
      exp: payload.exp,
      externalUserId: typeof data.externalUserId === 'string' ? data.externalUserId : undefined,
      iat: payload.iat,
      source: typeof data.source === 'string' ? data.source : undefined,
      userId: data.userId,
      username: data.username,
    };
  } catch {
    return null;
  }
}

/**
 * Set session cookie in response
 */
export async function setSessionCookie(sessionToken: string) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === 'production';

  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    secure: isProd,
  });
}

/**
 * Get session from cookie
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionToken) return null;

  return await verifySession(sessionToken);
}

/**
 * Clear session cookie
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
