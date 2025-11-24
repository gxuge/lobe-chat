/**
 * Qiankun micro-frontend type definitions
 */

/**
 * User information passed from main application
 */
export interface MainAppUserInfo {
  avatar?: string;
  email?: string;
  fromMainApp: boolean;
  phone?: string;
  realname: string;
  tenantId?: string | number;
  token: string;
  userId: string;
  username: string;
}

/**
 * Props passed from main application via qiankun
 */
export interface QiankunProps {
  /** Communication actions */
  actions?: Record<string, any>;

  /** Base path for routing */
  basePath?: string;

  /** Whether running in main application */
  isInMainApp: boolean;

  /** Login success callback */
  onLogin?: (data: { success: boolean; username: string }) => void;

  /** Logout callback */
  onLogout?: () => void;

  /** Token (compatibility field) */
  token?: string;

  /** User information (if main app is logged in) */
  userInfo: MainAppUserInfo | null;
}

/**
 * External authentication request
 */
export interface ExternalAuthRequest {
  externalAuth: true;
  token: string;
  userInfo?: {
    avatar?: string;
    email?: string;
    phone?: string;
    realname?: string;
    userId?: string;
  };
  username: string;
}

/**
 * External authentication response
 */
export interface ExternalAuthResponse {
  error?: string;
  message?: string;
  needsClientSignIn?: boolean;
  success: boolean;
  userId?: string;
  username?: string;
}

/**
 * Global window extension for qiankun
 */
declare global {
  interface Window {
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
    __POWERED_BY_QIANKUN__?: boolean;
    __QIANKUN_PROPS__?: QiankunProps;
  }
}

export {};
