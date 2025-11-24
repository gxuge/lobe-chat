import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 * @param password - Plain text password
 * @param hash - Hashed password
 * @returns True if password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with error message if invalid
 */
export function validatePassword(password: string): { error?: string, valid: boolean; } {
  if (!password) {
    return { error: '密码不能为空', valid: false };
  }

  if (password.length < 8) {
    return { error: '密码长度至少为 8 位', valid: false };
  }

  if (password.length > 100) {
    return { error: '密码长度不能超过 100 位', valid: false };
  }

  // At least one letter and one number
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return { error: '密码必须包含字母和数字', valid: false };
  }

  return { valid: true };
}

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Validation result with error message if invalid
 */
export function validateEmail(email: string): { error?: string, valid: boolean; } {
  if (!email) {
    return { error: '邮箱不能为空', valid: false };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: '邮箱格式不正确', valid: false };
  }

  return { valid: true };
}
