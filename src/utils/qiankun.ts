/**
 * Qiankun micro-frontend utilities
 * Provides helper functions for detecting and managing qiankun environment
 */
import type { QiankunProps } from '@/types/qiankun';

/**
 * Check if the app is running in qiankun micro-frontend environment
 */
export const isQiankunApp = (): boolean => {
  return typeof window !== 'undefined' && !!window.__POWERED_BY_QIANKUN__;
};

/**
 * Get qiankun props passed from main application
 */
export const getQiankunProps = (): QiankunProps | undefined => {
  if (typeof window === 'undefined') return undefined;
  return window.__QIANKUN_PROPS__;
};

/**
 * Check if user is from main application and logged in
 */
export const isMainAppUser = (): boolean => {
  const props = getQiankunProps();
  return !!props?.isInMainApp && !!props?.userInfo?.fromMainApp;
};

/**
 * Get main app user information
 */
export const getMainAppUserInfo = () => {
  const props = getQiankunProps();
  return props?.userInfo || null;
};

/**
 * Get base path for routing
 */
export const getBasePath = (): string => {
  const props = getQiankunProps();
  return props?.basePath || '';
};

/**
 * Notify main app about login success
 */
export const notifyMainAppLogin = (data: { success: boolean; username: string }) => {
  const props = getQiankunProps();
  props?.onLogin?.(data);
};

/**
 * Notify main app about logout
 */
export const notifyMainAppLogout = () => {
  const props = getQiankunProps();
  props?.onLogout?.();
};

/**
 * Get qiankun actions for communication with main app
 */
export const getQiankunActions = () => {
  const props = getQiankunProps();
  return props?.actions;
};
