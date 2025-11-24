'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function QiankunAutoLogin() {
  const router = useRouter();
  const hasAttemptedLogin = useRef(false);

  useEffect(() => {
    // Only run once
    if (hasAttemptedLogin.current) return;

    // Only run in qiankun environment
    if (typeof window === 'undefined' || !(window as any).__POWERED_BY_QIANKUN__) {
      return;
    }

    const props = (window as any).__QIANKUN_PROPS__;
    if (!props?.isInMainApp || !props?.userInfo?.fromMainApp) {
      return;
    }

    hasAttemptedLogin.current = true;

    const performAutoLogin = async () => {
      try {
        const { username, token } = props.userInfo;

        console.log('[QiankunAutoLogin] Attempting auto-login for:', username);

        // Call external login API to register/verify user
        const subAppOrigin =
          (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__?.replace(/\/$/, '') ||
          props.entry?.replace(/\/$/, '') ||
          window.location.origin;

        const response = await fetch(`${subAppOrigin}/api/auth/external-login`, {
          body: JSON.stringify({
            externalAuth: true,
            token,
            userInfo: {
              avatar: props.userInfo.avatar,
              email: props.userInfo.email,
              phone: props.userInfo.phone,
              realname: props.userInfo.realname,
              userId: props.userInfo.userId,
            },
            username,
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        });

        const data = await response.json();

        if (data.success) {
          console.log('[QiankunAutoLogin] User verified, signing in with NextAuth');

          // Use NextAuth signIn with credentials
          // Note: credentials provider expects email and password
          const result = await signIn('credentials', {
            email: username, // Use username as email
            password: token, // Use token as password for external auth
            redirect: false,
          });

          if (result?.ok) {
            console.log('[QiankunAutoLogin] Sign in successful, redirecting to /chat');
            props.onLogin?.({ success: true, username });
            router.push('/chat');
          } else {
            console.error('[QiankunAutoLogin] Sign in failed:', result?.error);
          }
        } else {
          console.error('[QiankunAutoLogin] External login failed:', data);
        }
      } catch (error) {
        console.error('[QiankunAutoLogin] Error:', error);
      }
    };

    performAutoLogin();
  }, [router]);

  return null;
}
