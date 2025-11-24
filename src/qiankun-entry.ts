/* eslint-enable no-undef */
import type { QiankunProps } from '@/types/qiankun';

/**
 * Qiankun micro-frontend lifecycle hooks
 * This file exports the bootstrap, mount, and unmount lifecycle hooks for qiankun
 */

/* eslint-disable no-undef */
// @ts-ignore
declare let __webpack_public_path__: string;

// Set public path for qiankun
if (typeof window !== 'undefined' && (window as any).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

let root: HTMLElement | null = null;

/**
 * Bootstrap lifecycle - called once when the micro-app is first loaded
 */
export async function bootstrap() {
  console.log('[LobeChat MicroApp] bootstrap');
}

/**
 * Mount lifecycle - called when the micro-app is mounted
 * This is where we handle auto-login for main app users
 */
export async function mount(props: QiankunProps) {
  console.log('[LobeChat MicroApp] mount', props);

  // Store props in window for access throughout the app
  window.__QIANKUN_PROPS__ = props;

  // Get the container
  const { container } = props as QiankunProps & { container?: HTMLElement };
  root = container ? container.querySelector('#root') : document.getElementById('root');

  // Handle auto-login for main app users
  if (props.isInMainApp && props.userInfo && props.userInfo.fromMainApp) {
    try {
      // Call auto-login API
      const response = await fetch('/api/auth/external-login', {
        body: JSON.stringify({
          externalAuth: true,
          token: props.userInfo.token,
          userInfo: {
            avatar: props.userInfo.avatar,
            email: props.userInfo.email,
            phone: props.userInfo.phone,
            realname: props.userInfo.realname,
            userId: props.userInfo.userId,
          },
          username: props.userInfo.username,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        console.log('[LobeChat MicroApp] Auto-login successful', data);
        props.onLogin?.({ success: true, username: data.username });
      } else {
        console.error('[LobeChat MicroApp] Auto-login failed', data);
      }
    } catch (error) {
      console.error('[LobeChat MicroApp] Auto-login error', error);
    }
  }
}

/**
 * Unmount lifecycle - called when the micro-app is unmounted
 */
export async function unmount(props: QiankunProps) {
  console.log('[LobeChat MicroApp] unmount', props);

  // Clear stored props
  window.__QIANKUN_PROPS__ = undefined;

  // Clear the root container
  if (root) {
    root.innerHTML = '';
    root = null;
  }
}

/**
 * Update lifecycle - called when props are updated
 */
export async function update(props: QiankunProps) {
  console.log('[LobeChat MicroApp] update', props);
  window.__QIANKUN_PROPS__ = props;
}
